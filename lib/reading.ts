import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { computeReadingTime } from './posts'
import { normalizeMathDelimiters } from './math'

const readingDirectory = path.join(process.cwd(), 'reading')

export type ReadingSummary = {
  slug: string
  title: string
  authors: string[]
  venue?: string
  year?: string | number
  dateRead: string // normalized to 'yyyy-mm-dd'
  topics: string[] // topics[0] is the note's home section; the rest cross-list it
  tags?: string[]
  description?: string
  readingTime: number
}

// A declared connection to another note; `reason` says how the two relate.
export type RelatedRef = {
  slug: string
  reason?: string
}

export type ReadingNote = ReadingSummary & {
  paperUrl?: string
  codeUrl?: string
  order?: number
  related: RelatedRef[]
  content: string
}

// `notes` are the section's own notes (its prev/next reading path);
// `crossListed` are notes whose home is another section but that belong here too.
export type ReadingGroup = {
  topic: string
  notes: ReadingSummary[]
  crossListed: ReadingSummary[]
}

export type ReadingConnection = {
  slug: string
  title: string
  topics: string[]
  reason?: string
  description?: string
}

// gray-matter turns unquoted YAML dates into Date objects; normalize so
// sorting, JSON props, and date-fns parseISO all see 'yyyy-mm-dd'.
// Returns '' when the value can't produce a valid date key.
function toDateKey(d: unknown): string {
  if (d instanceof Date) {
    return isNaN(d.getTime()) ? '' : d.toISOString().slice(0, 10)
  }
  const s = String(d ?? '').slice(0, 10)
  return /^\d{4}-\d{2}-\d{2}$/.test(s) ? s : ''
}

function toAuthors(a?: string | string[]): string[] {
  if (!a) return []
  return Array.isArray(a) ? a.map(String) : String(a).split(',').map((s) => s.trim())
}

// Sections overlap rather than partition the notes: `topics: [A, B]` files a
// note under A (its home) and cross-lists it in B. `topic: A` is the
// single-section shorthand.
function toTopics(topic: unknown, topics: unknown): string[] {
  const list = [topic, ...(Array.isArray(topics) ? topics : [topics])]
    .map((t) => String(t ?? '').trim())
    .filter(Boolean)
  const unique = Array.from(new Set(list))
  return unique.length > 0 ? unique : ['Misc']
}

// `related` takes a list of slugs or a `slug: reason` map. A connection shows
// on both notes, so declare it once, usually on the later note.
function toRelated(r: unknown): RelatedRef[] {
  const entries: [string, unknown][] = []
  const items = Array.isArray(r) ? r : r ? [r] : []
  for (const item of items) {
    if (typeof item === 'string') entries.push([item, undefined])
    else if (item && typeof item === 'object') entries.push(...Object.entries(item))
  }
  return entries.map(([slug, reason]) => {
    const ref: RelatedRef = { slug: slug.trim() }
    if (reason) ref.reason = String(reason).trim()
    return ref
  })
}

function readFile(slug: string): ReadingNote | null {
  const fullPath = path.join(readingDirectory, `${slug}.mdx`)
  if (!fs.existsSync(fullPath)) return null
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content: rawContent } = matter(fileContents) // gray-matter strips frontmatter before any MDX processing
  // Empty placeholder files (no frontmatter at all) are not notes yet; skip
  // them so they can't break the build, but say so in the build log.
  if (Object.keys(data).length === 0) {
    console.warn(`[reading] skipping ${slug}.mdx: no frontmatter yet (empty placeholder?)`)
    return null
  }
  if (data.draft) return null
  const content = normalizeMathDelimiters(rawContent)
  // dateRead drives ordering and every date display; a note without a usable
  // dateRead falls back to the file's mtime so it still publishes.
  let dateRead = toDateKey(data.dateRead)
  if (!dateRead) {
    dateRead = fs.statSync(fullPath).mtime.toISOString().slice(0, 10)
    console.warn(`[reading] ${slug}.mdx: missing or invalid dateRead, using file mtime ${dateRead}`)
  }
  const note: ReadingNote = {
    slug,
    title: String(data.title ?? slug),
    authors: toAuthors(data.authors),
    venue: data.venue,
    year: data.year,
    dateRead,
    topics: toTopics(data.topic, data.topics),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : undefined,
    paperUrl: data.paperUrl,
    codeUrl: data.codeUrl,
    description: data.description,
    order: data.order,
    related: toRelated(data.related),
    content,
    readingTime: computeReadingTime(content),
  }
  // Next.js rejects explicit `undefined` values in getStaticProps props;
  // drop absent optional fields entirely.
  Object.keys(note).forEach((k) => {
    if ((note as any)[k] === undefined) delete (note as any)[k]
  })
  return note
}

// Reading order: notes with an explicit `order` sort first (by that number),
// then everything else by dateRead ascending — older reads first, book-like.
export function getSortedReadingNotes(): ReadingNote[] {
  const slugs = fs
    .readdirSync(readingDirectory)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
    .filter((slug) => slug !== 'index') // reserved: pages/reading.tsx owns /reading

  const notes = slugs
    .map(readFile)
    .filter((note): note is ReadingNote => note !== null)

  return notes.sort((a, b) => {
    const ao = a.order ?? Number.MAX_SAFE_INTEGER
    const bo = b.order ?? Number.MAX_SAFE_INTEGER
    if (ao !== bo) return ao - bo
    if (a.dateRead !== b.dateRead) return a.dateRead < b.dateRead ? -1 : 1
    return a.slug < b.slug ? -1 : 1
  })
}

// Topics ordered by each topic's earliest home note, so topic order follows
// the reading narrative and cross-listing a note never reshuffles sections;
// reordering topics means editing frontmatter only.
export function getReadingGroups(notes: ReadingNote[]): ReadingGroup[] {
  const map = new Map<string, ReadingGroup>()
  const groupFor = (topic: string) => {
    if (!map.has(topic)) map.set(topic, { topic, notes: [], crossListed: [] })
    return map.get(topic)!
  }
  notes.forEach((n) => groupFor(n.topics[0]))
  for (const n of notes) {
    const { content, order, paperUrl, codeUrl, related, ...summary } = n
    n.topics.forEach((topic, i) => {
      const group = groupFor(topic)
      ;(i === 0 ? group.notes : group.crossListed).push(summary)
    })
  }
  return Array.from(map.values())
}

// Links to other notes in the body count as connections too, so linking a
// note in prose is enough to connect both pages.
const NOTE_LINK_RE = /\]\(\s*\/reading\/([^)\s#?]+)/g

function outgoingRefs(note: ReadingNote): RelatedRef[] {
  const linked = Array.from(note.content.matchAll(NOTE_LINK_RE), (m) => ({ slug: m[1] }))
  return [...note.related, ...linked]
}

// Connections are symmetric: a note shows what it links to and what links to
// it. The note's own reason wins over the other side's. Reading order.
export function getConnections(slug: string, notes: ReadingNote[]): ReadingConnection[] {
  const self = notes.find((n) => n.slug === slug)
  if (!self) return []
  const published = new Set(notes.map((n) => n.slug))
  const reasons = new Map<string, string | undefined>()
  const connect = (other: string, reason?: string) => {
    if (!reasons.get(other)) reasons.set(other, reason)
  }
  for (const ref of outgoingRefs(self)) {
    if (ref.slug === slug) continue
    if (published.has(ref.slug)) connect(ref.slug, ref.reason)
    else console.warn(`[reading] ${slug}.mdx: no published note '${ref.slug}' to connect to (typo or draft?)`)
  }
  for (const n of notes) {
    if (n.slug === slug) continue
    for (const ref of outgoingRefs(n)) {
      if (ref.slug === slug) connect(n.slug, ref.reason)
    }
  }
  return notes
    .filter((n) => reasons.has(n.slug))
    .map((n) => {
      const c: ReadingConnection = { slug: n.slug, title: n.title, topics: n.topics }
      const reason = reasons.get(n.slug)
      if (reason) c.reason = reason
      else if (n.description) c.description = n.description
      return c
    })
}

export function getReadingSlugs(): string[] {
  return getSortedReadingNotes().map((n) => n.slug)
}

export function getReadingNoteData(slug: string): ReadingNote | null {
  return readFile(slug)
}

export function getAdjacentNotes(slug: string, notes: ReadingNote[]) {
  const idx = notes.findIndex((n) => n.slug === slug)
  if (idx === -1) return { previous: null, next: null }
  return {
    previous: idx > 0 ? notes[idx - 1] : null,
    next: idx < notes.length - 1 ? notes[idx + 1] : null,
  }
}
