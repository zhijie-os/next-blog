import { useState, useEffect } from 'react'

export default function OnThisPage({ headings, className = '' }: {
  headings: { level: number; text: string; id: string }[]
  className?: string
}) {
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    if (headings.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-80px 0px -80% 0px' }
    )

    headings.forEach((h) => {
      const el = document.getElementById(h.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [headings])

  return (
    <aside className={`w-36 flex-shrink-0 ${className}`}>
      <nav className="sticky top-8">
        <h3 className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-500 mb-2 uppercase tracking-wider">
          On this page
        </h3>
        <ul className="space-y-0.5 border-l-2 border-neutral-200 dark:border-neutral-800">
          {headings.map((h) => (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
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
