import Link from 'next/link'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import { slugify } from '../../lib/slugify'

export default function PrevNext({ topic, previous, next }: {
  topic?: string
  previous?: { slug: string; title: string } | null
  next?: { slug: string; title: string } | null
}) {
  if (!previous && !next) return null
  return (
    <nav className="mt-16 pt-6 border-t border-neutral-200 dark:border-neutral-800">
      {topic && (
        <Link
          href={`/reading#${slugify(topic)}`}
          className="inline-block mb-3 text-[11px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 hover:text-blue-600 dark:hover:text-blue-400 hover:no-underline"
        >
          {topic}
        </Link>
      )}
      <div className="grid grid-cols-2 gap-4">
        {previous ? (
          <Link
            href={`/reading/${previous.slug}`}
            className="group flex flex-col gap-1 rounded-xl border border-neutral-200 dark:border-neutral-800 p-4 hover:border-blue-600/50 dark:hover:border-blue-400/50 hover:no-underline transition-colors"
          >
            <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
              <FiArrowLeft className="group-hover:-translate-x-0.5 transition-transform" />
              Previous
            </span>
            <span className="text-sm font-medium leading-snug text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {previous.title}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/reading/${next.slug}`}
            className="group flex flex-col gap-1 items-end text-right rounded-xl border border-neutral-200 dark:border-neutral-800 p-4 hover:border-blue-600/50 dark:hover:border-blue-400/50 hover:no-underline transition-colors"
          >
            <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
              Next
              <FiArrowRight className="group-hover:translate-x-0.5 transition-transform" />
            </span>
            <span className="text-sm font-medium leading-snug text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {next.title}
            </span>
          </Link>
        ) : (
          <span />
        )}
      </div>
    </nav>
  )
}
