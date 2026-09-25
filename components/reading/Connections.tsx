import Link from 'next/link'
import type { ReadingConnection } from '../../lib/reading'

// Notes this one links to or is linked from, often across sections; the
// section label shows where the connection leads.
export default function Connections({ connections }: { connections: ReadingConnection[] }) {
  if (connections.length === 0) return null
  return (
    <section id="connected-notes" className="mt-16">
      <h2 className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-3">
        Connected notes
      </h2>
      <ul className="space-y-3">
        {connections.map((c) => (
          <li key={c.slug}>
            <Link
              href={`/reading/${c.slug}`}
              className="group block rounded-xl border border-neutral-200 dark:border-neutral-800 p-4 hover:border-blue-600/50 dark:hover:border-blue-400/50 hover:no-underline transition-colors"
            >
              <span className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                {c.topics[0]}
              </span>
              <span className="block mt-1 text-sm font-medium leading-snug text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {c.title}
              </span>
              {c.reason ? (
                <span className="block mt-1.5 text-[13px] leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {c.reason}
                </span>
              ) : c.description ? (
                <span className="mt-1.5 text-[13px] leading-relaxed text-neutral-500 dark:text-neutral-400 overflow-hidden [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
                  {c.description}
                </span>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
