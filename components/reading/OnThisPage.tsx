import { useState, useEffect, useRef } from 'react'

export default function OnThisPage({ headings, className = '' }: {
  headings: { level: number; text: string; id: string }[]
  className?: string
}) {
  const [activeId, setActiveId] = useState('')
  const navRef = useRef<HTMLElement>(null)

  // The active heading is the last one scrolled past the top of the viewport
  // (or the last heading once the page bottom is reached), so jumps and long
  // sections still highlight the right entry.
  useEffect(() => {
    const els = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null)
    if (els.length === 0) return
    let frame = 0
    const update = () => {
      frame = 0
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      let current = atBottom ? els[els.length - 1].id : ''
      if (!atBottom) {
        for (const el of els) {
          if (el.getBoundingClientRect().top > 100) break
          current = el.id
        }
      }
      setActiveId(current)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [headings])

  // Long lists scroll inside the sticky nav; keep the active entry visible.
  useEffect(() => {
    const nav = navRef.current
    const link = nav?.querySelector<HTMLElement>(`[data-id="${activeId}"]`)
    if (!nav || !link) return
    if (link.offsetTop < nav.scrollTop + 32) {
      nav.scrollTop = link.offsetTop - 32
    } else if (link.offsetTop + link.offsetHeight > nav.scrollTop + nav.clientHeight - 32) {
      nav.scrollTop = link.offsetTop + link.offsetHeight - nav.clientHeight + 32
    }
  }, [activeId])

  return (
    <aside className={`flex-shrink-0 ${className}`}>
      <nav ref={navRef} className="sticky top-8 max-h-[calc(100vh-4rem)] overflow-y-auto">
        <h3 className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-500 mb-2 uppercase tracking-wider">
          On this page
        </h3>
        <ul className="space-y-0.5 border-l-2 border-neutral-200 dark:border-neutral-800">
          {headings.map((h) => (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                data-id={h.id}
                title={h.text}
                className={`block text-[13px] leading-snug py-0.5 transition-colors hover:no-underline truncate ${
                  h.level === 3 ? 'pl-3' : 'pl-2'
                } ${
                  activeId === h.id
                    ? 'text-blue-600 dark:text-blue-400 border-l-2 -ml-[2px] border-blue-600 dark:border-blue-400 font-medium'
                    : 'text-neutral-400 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200'
                }`}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
