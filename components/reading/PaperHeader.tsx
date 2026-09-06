import { FiExternalLink, FiGithub } from 'react-icons/fi'
import Date from '../date'
import type { ReadingSummary } from '../../lib/reading'

export default function PaperHeader({ note }: { note: ReadingSummary & {
  paperUrl?: string
  codeUrl?: string
} }) {
  const byline = [
    note.venue && note.year ? `${note.venue}, ${note.year}` : note.venue || note.year,
  ]
    .filter(Boolean)
    .join('')

  return (
    <header className="mb-8">
      <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
        {note.title}
      </h1>

      {note.authors.length > 0 && (
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
          {note.authors.join(', ')}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1.5 text-xs text-neutral-400 dark:text-neutral-500">
        {byline && <span>{byline}</span>}
        <span>
          read <Date dateString={note.dateRead} />
        </span>
        <span>{note.readingTime} min</span>
      </div>

      {(note.paperUrl || note.codeUrl) && (
        <div className="flex flex-wrap gap-2 mt-3">
          {note.paperUrl && (
            <a
              href={note.paperUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[13px] font-medium text-blue-600 dark:text-blue-400 border border-blue-600/30 dark:border-blue-400/30 hover:bg-blue-50 dark:hover:bg-blue-400/10 no-underline transition-colors"
            >
              Paper
              <FiExternalLink className="text-xs" />
            </a>
          )}
          {note.codeUrl && (
            <a
              href={note.codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[13px] font-medium text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800 hover:border-blue-600/50 dark:hover:border-blue-400/50 no-underline transition-colors"
            >
              <FiGithub className="text-xs" />
              Code
            </a>
          )}
        </div>
      )}

      {note.tags && note.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-4">
          {note.tags.map((tag: string) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </header>
  )
}
