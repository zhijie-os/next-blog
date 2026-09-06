// Pure helpers shared by server libs and client components (no fs, no node APIs).

export const HEADING_RE = /^(#{2,3})\s+(.+)$/gm

export function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

// Strip inline markdown so server-extracted heading ids match the ids the MDX
// heading renderer computes from rendered children.
export function plainText(md: string): string {
  return md
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // [text](url) -> text
    .replace(/[*_`~#]/g, '')
}
