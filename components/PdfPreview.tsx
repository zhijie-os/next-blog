import Image from 'next/image'
import { FiFileText } from 'react-icons/fi'
import type { CheatSheet } from '../lib/cheatsheet'
import type { PageImage } from '../lib/pdfPreview'

type Cover = Pick<CheatSheet, 'id' | 'title' | 'pages' | 'preview'>

function CoverImage({ sheet, sizes, priority }: { sheet: Cover; sizes: string; priority?: boolean }) {
  return sheet.preview ? (
    <Image
      src={sheet.preview.src}
      width={sheet.preview.width}
      height={sheet.preview.height}
      sizes={sizes}
      priority={priority}
      alt={`First page of the ${sheet.title} cheat sheet`}
      className="block h-auto w-full"
    />
  ) : (
    <div className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-2 bg-neutral-50 text-neutral-400">
      <FiFileText className="h-10 w-10" />
      <span className="text-sm font-medium">{sheet.title}</span>
    </div>
  )
}

const pageClass = 'rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white shadow-sm'

// A sheet's first page, with the next pages peeking out behind it when the
// PDF has more than one. Inside a `group`, the pages spread on hover.
export function SheetPreview({ sheet, sizes, priority }: { sheet: Cover; sizes: string; priority?: boolean }) {
  const extraPages = Math.min(Math.max((sheet.pages ?? 1) - 1, 0), 2)
  return (
    <div className="relative mb-3 mr-3">
      {extraPages >= 2 && (
        <div aria-hidden className={`absolute inset-0 translate-x-3 translate-y-3 transition-transform duration-300 group-hover:translate-x-4 group-hover:translate-y-4 dark:bg-neutral-300 ${pageClass}`} />
      )}
      {extraPages >= 1 && (
        <div aria-hidden className={`absolute inset-0 translate-x-1.5 translate-y-1.5 transition-transform duration-300 group-hover:translate-x-2 group-hover:translate-y-2 dark:bg-neutral-200 ${pageClass}`} />
      )}
      <div className={`relative overflow-hidden transition duration-300 group-hover:-translate-y-0.5 group-hover:shadow-md ${pageClass}`}>
        <CoverImage sheet={sheet} sizes={sizes} priority={priority} />
      </div>
    </div>
  )
}

// Up to three covers fanned like a hand of cards, the first one on top.
export function SheetFan({ sheets }: { sheets: Cover[] }) {
  const covers = sheets.slice(0, 3)
  if (covers.length === 1) return <SheetPreview sheet={covers[0]} sizes="224px" />
  const slots = [0, -1, 1] // first cover in the middle, then left, then right
  return (
    <div className="relative mx-auto aspect-[4/3] w-4/5 [--spread:1] group-hover:[--spread:1.35]">
      {covers.map((sheet, i) => {
        const slot = slots[i]
        return (
          <div
            key={sheet.id}
            className={`absolute inset-0 overflow-hidden transition-transform duration-300 ${pageClass}`}
            style={{
              zIndex: 3 - Math.abs(slot),
              transform: `translateX(calc(var(--spread) * ${slot * 16}%)) rotate(calc(var(--spread) * ${slot * 5}deg))`,
            }}
          >
            <CoverImage sheet={sheet} sizes="224px" />
          </div>
        )
      })}
    </div>
  )
}

const thumbPageClass = 'rounded-[3px] border border-neutral-200 dark:border-neutral-700 bg-white shadow-sm'

// A paper's first pages as a small stack. Inside a `group` they fan out on
// hover from a shared bottom pivot, like the cheat sheet deck.
export function PageFan({ pages, title, sizes = '96px' }: { pages: PageImage[]; title: string; sizes?: string }) {
  const [front, ...back] = pages.slice(0, 3)
  if (!front) return null
  return (
    <div className="relative [--fan:0] group-hover:[--fan:1]" style={{ aspectRatio: `${front.width} / ${front.height}` }}>
      {back
        .map((page, i) => ({ page, depth: i + 1 }))
        .reverse()
        .map(({ page, depth }) => (
          <div
            key={page.src}
            aria-hidden
            className={`absolute inset-0 origin-bottom overflow-hidden transition-transform duration-300 ease-out ${thumbPageClass}`}
            style={{
              transform: `translate(calc((1 - var(--fan)) * ${depth * 3}px), calc((1 - var(--fan)) * ${depth * 3}px)) rotate(calc(var(--fan) * ${depth * 7}deg))`,
            }}
          >
            <Image src={page.src} width={page.width} height={page.height} sizes={sizes} alt="" className="h-full w-full object-cover" />
          </div>
        ))}
      <div
        className={`relative origin-bottom overflow-hidden transition duration-300 ease-out group-hover:shadow-md ${thumbPageClass}`}
        style={{ transform: 'rotate(calc(var(--fan) * -4deg))' }}
      >
        <Image src={front.src} width={front.width} height={front.height} sizes={sizes} alt={`First page of ${title}`} className="block h-auto w-full" />
      </div>
    </div>
  )
}
