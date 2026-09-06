import Link from 'next/link'
import Layout, { siteUrl } from '../components/layout'
import Date from '../components/date'
import ReadingSidebar from '../components/reading/Sidebar'
import { getSortedReadingNotes, getReadingGroups } from '../lib/reading'
import type { ReadingGroup, ReadingSummary } from '../lib/reading'

export async function getStaticProps() {
    const groups = getReadingGroups(getSortedReadingNotes())
    return {
        props: { groups },
        revalidate: 3600,
    }
}

export default function ReadingIndex({ groups }: { groups: ReadingGroup[] }) {
    return (
        <Layout
            metaTitle="Reading | Zhijie Xia"
            metaDescription="A book-style notebook of research papers I have read: regime detection, continual RL, streaming RL, world models."
            ogType="website"
            canonical={`${siteUrl}/reading`}
            showMiniAvatar
            docs
        >
            <div className="flex flex-col lg:flex-row gap-6 py-8">
                <ReadingSidebar groups={groups} activeSlug={null} />

                <main className="min-w-0 flex-1 max-w-3xl">
                    {groups.map((group) => (
                        <section key={group.topic} className="mb-12 border-t border-neutral-200 dark:border-neutral-800 pt-6">
                            <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100 flex items-center gap-2 mb-1">
                                {group.topic}
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500">
                                    {group.notes.length}
                                </span>
                            </h2>
                            <ul>
                                {group.notes.map((note: ReadingSummary) => (
                                    <li key={note.slug} className="py-4">
                                        <Link
                                            href={`/reading/${note.slug}`}
                                            className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 hover:text-blue-600 dark:hover:text-blue-400 hover:no-underline"
                                        >
                                            {note.title}
                                        </Link>
                                        {note.description && (
                                            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
                                                {note.description}
                                            </p>
                                        )}
                                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1 text-xs text-neutral-400 dark:text-neutral-500">
                                            {note.venue && (
                                                <span>
                                                    {note.venue}
                                                    {note.year ? `, ${note.year}` : ''}
                                                </span>
                                            )}
                                            <span>
                                                read <Date dateString={note.dateRead} />
                                            </span>
                                        </div>
                                        {note.tags && note.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-1 mt-2">
                                                {note.tags.map((tag: string) => (
                                                    <span
                                                        key={tag}
                                                        className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    ))}
                </main>
            </div>
        </Layout>
    )
}
