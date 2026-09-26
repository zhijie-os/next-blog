import fs from 'fs'
import path from 'path'
import sizeOf from 'image-size'

export type CheatSheet = {
  id: string
  title: string
  subtitle?: string
  description?: string
  pdf: string // public URL of the PDF
  pages?: number
  sizeKB: number
  preview?: { src: string; width: number; height: number }
}

type ManifestEntry = {
  id: string
  file: string
  title: string
  subtitle?: string
  description?: string
  pages?: number
}

const sheetDir = path.join(process.cwd(), 'public', 'rl-cheatsheet')
const manifestPath = path.join(process.cwd(), 'data', 'rl-cheatsheet.json')

// Every PDF in public/rl-cheatsheet, in data/rl-cheatsheet.json order (see
// scripts/pdf-previews.mjs). A PDF that hasn't been through
// `npm run previews` yet still shows up, titled by its file name and
// without a preview image.
export function getCheatSheets(): CheatSheet[] {
  if (!fs.existsSync(sheetDir)) return []
  const pdfs = fs.readdirSync(sheetDir).filter((f) => /\.pdf$/i.test(f)).sort()
  const manifest: ManifestEntry[] = fs.existsSync(manifestPath)
    ? JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
    : []

  const listed = manifest.filter((e) => pdfs.includes(e.file))
  const unlisted = pdfs
    .filter((file) => !listed.some((e) => e.file === file))
    .map((file): ManifestEntry => {
      console.warn(`[cheatsheet] ${file} is not in data/rl-cheatsheet.json yet: run npm run previews`)
      const id = file.replace(/\.pdf$/i, '')
      return { id, file, title: id.replace(/[-_]+/g, ' ') }
    })

  return [...listed, ...unlisted].map((e) => {
    const sheet: CheatSheet = {
      id: e.id,
      title: e.title,
      pdf: `/rl-cheatsheet/${encodeURIComponent(e.file)}`,
      sizeKB: Math.round(fs.statSync(path.join(sheetDir, e.file)).size / 1024),
    }
    if (e.subtitle) sheet.subtitle = e.subtitle
    if (e.description) sheet.description = e.description
    if (e.pages) sheet.pages = e.pages
    const previewFile = path.join(sheetDir, 'previews', `${e.id}.jpg`)
    if (fs.existsSync(previewFile)) {
      const { width = 1400, height = 1050 } = sizeOf(previewFile)
      sheet.preview = { src: `/rl-cheatsheet/previews/${e.id}.jpg`, width, height }
    }
    return sheet
  })
}
