import Link from 'next/link'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'

type PostLink = { id: string; title: string } | null

// Chronological, left to right: the older post on the left, the newer one on the right.
export default function PostNav({ older, newer }: { older: PostLink; newer: PostLink }) {
  if (!older && !newer) return null
  return (
    <nav aria-label="More posts" className="grid gap-4 sm:grid-cols-2">
      {older ? (
        <Link
          href={`/posts/${older.id}`}
          className="group flex flex-col gap-1 rounded-xl border border-neutral-200 dark:border-neutral-800 p-4 hover:border-blue-600/50 dark:hover:border-blue-400/50 hover:no-underline transition-colors"
        >
          <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
            <FiArrowLeft className="group-hover:-translate-x-0.5 transition-transform" />
            Older
          </span>
          <span className="text-sm font-medium leading-snug text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {older.title}
          </span>
        </Link>
      ) : (
        <span className="hidden sm:block" />
      )}
      {newer && (
        <Link
          href={`/posts/${newer.id}`}
          className="group flex flex-col gap-1 sm:items-end sm:text-right rounded-xl border border-neutral-200 dark:border-neutral-800 p-4 hover:border-blue-600/50 dark:hover:border-blue-400/50 hover:no-underline transition-colors"
        >
          <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
            Newer
            <FiArrowRight className="group-hover:translate-x-0.5 transition-transform" />
          </span>
          <span className="text-sm font-medium leading-snug text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {newer.title}
          </span>
        </Link>
      )}
    </nav>
  )
}
