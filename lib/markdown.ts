// Markdown helpers for blog posts (no fs, no node APIs). The same remark
// plugin runs on the server (to build the TOC) and in the browser (to render
// headings), so both always agree on heading levels and ids.
import { slugify } from './slugify'

export type TocEntry = { level: number; text: string; id: string }

type MdNode = {
  type: string
  depth?: number
  value?: string
  children?: MdNode[]
  data?: { hProperties?: Record<string, unknown>; [key: string]: unknown }
}

function nodeText(node: MdNode): string {
  if (typeof node.value === 'string') return node.value
  return (node.children || []).map(nodeText).join('')
}

function headingsOf(node: MdNode, out: MdNode[] = []): MdNode[] {
  if (node.type === 'heading') out.push(node)
  else node.children?.forEach((child) => headingsOf(child, out))
  return out
}

// Older posts use `#` for sections, but the post title is the page's only h1:
// shift headings so the top level a post uses renders as h2. Each heading
// also gets a unique id ("solution", "solution-1", ...) so anchors and the
// TOC still work when a heading text repeats.
export function remarkPostHeadings() {
  return (tree: any) => {
    const headings = headingsOf(tree as MdNode)
    if (headings.length === 0) return
    const shift = 2 - Math.min(...headings.map((h) => h.depth ?? 2))
    const used = new Set<string>()
    for (const h of headings) {
      h.depth = Math.min(6, Math.max(2, (h.depth ?? 2) + shift))
      const base = slugify(nodeText(h)) || 'section'
      let id = base
      for (let i = 1; used.has(id); i++) id = `${base}-${i}`
      used.add(id)
      h.data = { ...h.data, hProperties: { ...h.data?.hProperties, id } }
    }
  }
}

// The TOC lists the top two levels. Headings whose text repeats three or more
// times ("Description", "Solution") label parts of each item rather than
// being destinations of their own, so they are left out.
export function tocFromTree(tree: any): TocEntry[] {
  const entries = headingsOf(tree as MdNode).map((h) => ({
    level: h.depth ?? 2,
    text: nodeText(h).trim(),
    id: String(h.data?.hProperties?.id ?? ''),
  }))
  const counts = new Map<string, number>()
  entries.forEach((e) => counts.set(e.text, (counts.get(e.text) ?? 0) + 1))
  return entries.filter((e) => e.level <= 3 && (counts.get(e.text) ?? 0) < 3)
}
