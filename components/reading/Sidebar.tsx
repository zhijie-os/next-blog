import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { FiList, FiSearch, FiX } from 'react-icons/fi'
import type { ReadingGroup, ReadingSummary } from '../../lib/reading'

export default function ReadingSidebar({ groups, activeSlug }: {
  groups: ReadingGroup[]
  activeSlug?: string | null
}) {
  const [query, setQuery] = useState('')
  const [drawerOpen, setDrawerOpen] = useState(false)

  const openDrawer = () => {
    setDrawerOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeDrawer = () => {
    setDrawerOpen(false)
    document.body.style.overflow = 'auto'
  }

  // Restore body scroll if the drawer is open while navigating away.
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return groups
    return groups
      .map((g) => ({
        topic: g.topic,
        notes: g.notes.filter((n: ReadingSummary) =>
          [n.title, n.topic, n.venue, n.description, n.year, (n.tags || []).join(' ')]
            .filter(Boolean)
            .join(' ')
            .toLowerCase()
            .includes(q) || (n.authors || []).join(' ').toLowerCase().includes(q)
        ),
      }))
      .filter((g) => g.notes.length > 0)
  }, [groups, query])

  const total = groups.reduce((acc, g) => acc + g.notes.length, 0)

  const list = (
    <div>
      <div className="relative mb-4">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500 text-sm" />
        <input
          type="text"
          placeholder="Filter papers..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
      </div>
      {filtered.length === 0 ? (
        <p className="text-xs text-neutral-400 dark:text-neutral-500 py-4 text-center">
          No papers found.
        </p>
      ) : (
        filtered.map((g) => (
          <div key={g.topic} className="mb-4">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                {g.topic}
              </h3>
              <span className="text-[10px] text-neutral-300 dark:text-neutral-600">
                {g.notes.length}
              </span>
            </div>
            <ul className="space-y-px border-l border-neutral-200 dark:border-neutral-800">
              {g.notes.map((n: ReadingSummary) => (
                <li key={n.slug}>
                  <Link
                    href={`/reading/${n.slug}`}
                    onClick={drawerOpen ? closeDrawer : undefined}
                    className={`block text-[13px] leading-snug py-1 pl-3 border-l-2 -ml-px transition-colors hover:no-underline ${
                      activeSlug === n.slug
                        ? 'border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 font-medium'
                        : 'border-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
                    }`}
                  >
                    {n.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  )

  return (
    <>
      {/* Mobile trigger row */}
      <div className="lg:hidden mb-4">
        <button
          onClick={openDrawer}
          className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3 py-1.5 text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400"
        >
          <FiList />
          Browse papers
          <span className="text-xs text-neutral-400 dark:text-neutral-500">({total})</span>
        </button>
      </div>

      {/* Desktop sticky sidebar */}
      <aside className="hidden lg:block w-56 flex-shrink-0">
        <nav className="sticky top-8 max-h-[calc(100vh-4rem)] overflow-y-auto pr-1 -mr-1">
          {list}
        </nav>
      </aside>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-neutral-900/50"
            onClick={closeDrawer}
          />
          <div className="absolute left-0 top-0 h-full w-80 max-w-[85vw] overflow-y-auto bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 p-4 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                Reading
              </span>
              <button
                onClick={closeDrawer}
                aria-label="Close"
                className="rounded p-1 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100"
              >
                <FiX />
              </button>
            </div>
            {list}
          </div>
        </div>
      )}
    </>
  )
}
