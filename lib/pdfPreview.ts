import fs from 'fs'
import path from 'path'
import sizeOf from 'image-size'

export type PageImage = { src: string; width: number; height: number }

// Page thumbnails rendered by scripts/pdf-previews.mjs: /previews/<name>-1.jpg
// to -3.jpg for /<name>.pdf. Empty until `npm run previews` has run for it.
export function getPageImages(pdfUrl: string): PageImage[] {
  const name = path.basename(pdfUrl, path.extname(pdfUrl))
  const images: PageImage[] = []
  for (let n = 1; n <= 3; n++) {
    const src = `/previews/${name}-${n}.jpg`
    const file = path.join(process.cwd(), 'public', src)
    if (!fs.existsSync(file)) break
    const { width = 408, height = 528 } = sizeOf(file)
    images.push({ src, width, height })
  }
  return images
}
