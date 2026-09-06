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
  topic: string
  tags?: string[]
  description?: string
  readingTime: number
}

export type ReadingNote = ReadingSummary & {
  paperUrl?: string
  codeUrl?: string
  order?: number
  content: string
}

export type ReadingGroup = {
  topic: string
  notes: ReadingSummary[]
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
    topic: String(data.topic ?? 'Misc'),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : undefined,
    paperUrl: data.paperUrl,
    codeUrl: data.codeUrl,
    description: data.description,
    order: data.order,
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

// Topics ordered by each topic's earliest note, so topic order follows the
// reading narrative; reordering topics means editing frontmatter only.
export function getReadingGroups(notes: ReadingNote[]): ReadingGroup[] {
  const map = new Map<string, ReadingSummary[]>()
  for (const n of notes) {
    const { content, order, paperUrl, codeUrl, ...summary } = n
    if (!map.has(n.topic)) map.set(n.topic, [])
    map.get(n.topic)!.push(summary)
  }
  return Array.from(map.entries()).map(([topic, notes]) => ({ topic, notes }))
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
