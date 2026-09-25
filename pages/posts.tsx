import { useMemo, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { FiRss, FiSearch, FiX } from "react-icons/fi"
import Layout, { siteUrl } from "../components/layout"
import Date from "../components/date"
import { getSortedPostsData } from "../lib/posts"

type PostSummary = {
    id: string
    title: string
    date: string
    description: string | null
    tags: string[]
    readingTime: number
}

export async function getStaticProps() {
    const posts: PostSummary[] = getSortedPostsData().map((p: any) => ({
        id: p.id,
        title: p.title,
        date: p.date,
        description: p.description ?? null,
        tags: p.tags ?? [],
        readingTime: p.readingTime,
    }))
    return {
        props: { posts },
        revalidate: 3600,
    }
}

// Tags shared by two or more posts become filters; one-off tags stay
// reachable through the tag links on each post (?tag=...).
function sharedTags(posts: PostSummary[]): [string, number][] {
    const counts = new Map<string, number>()
    posts.forEach((p) => p.tags.forEach((t) => counts.set(t, (counts.get(t) ?? 0) + 1)))
    return Array.from(counts.entries())
        .filter(([, n]) => n >= 2)
        .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
}

const chipClass = (active: boolean) =>
    `rounded-full px-3 py-1 text-xs font-medium transition-colors ${
        active
            ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
            : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-100"
    }`

export default function Posts({ posts }: { posts: PostSummary[] }) {
    const router = useRouter()
    const [search, setSearch] = useState("")
    const activeTag = typeof router.query.tag === "string" ? router.query.tag : null

    const setTag = (tag: string | null) => {
        router.replace({ pathname: "/posts", query: tag ? { tag } : {} }, undefined, { shallow: true, scroll: false })
    }

    const chips = useMemo(() => {
        const shared = sharedTags(posts)
        if (!activeTag || shared.some(([t]) => t === activeTag)) return shared
        const count = posts.filter((p) => p.tags.includes(activeTag)).length
        return [[activeTag, count] as [string, number], ...shared]
    }, [posts, activeTag])

    const years = useMemo(() => {
        const q = search.trim().toLowerCase()
        const groups: { year: string; posts: PostSummary[] }[] = []
        posts
            .filter((p) => !activeTag || p.tags.includes(activeTag))
            .filter((p) => !q || [p.title, p.description, p.tags.join(" ")].join(" ").toLowerCase().includes(q))
            .forEach((p) => {
                const year = p.date.slice(0, 4)
                const last = groups[groups.length - 1]
                if (last && last.year === year) last.posts.push(p)
                else groups.push({ year, posts: [p] })
            })
        return groups
    }, [posts, search, activeTag])

    return (
        <Layout
            metaTitle="Blog | Zhijie Xia"
            metaDescription="Technical blog posts about LeetCode, CUDA, reinforcement learning, DevOps, and competitive programming."
            ogType="website"
            canonical={`${siteUrl}/posts`}
        >
            <section className="py-12 sm:py-16">
                <header>
                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
                        Blog
                    </h1>
                    <p className="mt-3 text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
                        Notes on reinforcement learning, LLM infrastructure, and whatever I am building.
                    </p>
                    <p className="mt-3 flex items-center gap-2.5 text-sm text-neutral-400 dark:text-neutral-500">
                        <span>{posts.length} posts</span>
                        <span aria-hidden="true">·</span>
                        <a
                            href="/rss.xml"
                            className="inline-flex items-center gap-1 hover:text-neutral-900 dark:hover:text-neutral-100 hover:no-underline transition-colors"
                        >
                            <FiRss className="text-xs" />
                            RSS
                        </a>
                    </p>
                </header>

                <div className="mt-10 space-y-4">
                    <div className="relative">
                        <FiSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500" />
                        <input
                            type="text"
                            placeholder="Search posts"
                            aria-label="Search posts"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={(e) => e.key === "Escape" && setSearch("")}
                            className="w-full rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 py-2.5 pl-10 pr-10 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:border-neutral-400 dark:focus:border-neutral-600 focus:outline-none focus:ring-4 focus:ring-neutral-100 dark:focus:ring-neutral-800 transition"
                        />
                        {search && (
                            <button
                                type="button"
                                onClick={() => setSearch("")}
                                aria-label="Clear search"
                                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
                            >
                                <FiX />
                            </button>
                        )}
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <button
                            type="button"
                            onClick={() => setTag(null)}
                            aria-pressed={!activeTag}
                            className={chipClass(!activeTag)}
                        >
                            All
                        </button>
                        {chips.map(([tag, count]) => (
                            <button
                                key={tag}
                                type="button"
                                onClick={() => setTag(activeTag === tag ? null : tag)}
                                aria-pressed={activeTag === tag}
                                className={chipClass(activeTag === tag)}
                            >
                                {tag}
                                <span className="ml-1.5 tabular-nums opacity-60">{count}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {years.length === 0 ? (
                    <div className="mt-12 rounded-xl border border-dashed border-neutral-300 dark:border-neutral-700 px-6 py-12 text-center">
                        <p className="text-sm text-neutral-500 dark:text-neutral-400">No posts match these filters.</p>
                        <button
                            type="button"
                            onClick={() => {
                                setSearch("")
                                setTag(null)
                            }}
                            className="mt-3 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                        >
                            Clear filters
                        </button>
                    </div>
                ) : (
                    <div className="mt-10 space-y-10">
                        {years.map(({ year, posts: yearPosts }) => (
                            <section key={year} className="sm:grid sm:grid-cols-[4.5rem_1fr] sm:gap-x-4">
                                <h2 className="mb-2 text-sm font-semibold tabular-nums text-neutral-400 dark:text-neutral-500 sm:sticky sm:top-6 sm:mb-0 sm:self-start sm:pt-3.5">
                                    {year}
                                </h2>
                                <ul className="-mx-3 space-y-1">
                                    {yearPosts.map((post) => (
                                        <li key={post.id}>
                                            <Link
                                                href={`/posts/${post.id}`}
                                                className="group flex gap-6 rounded-xl px-3 py-3 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 hover:no-underline transition-colors"
                                            >
                                                <div className="min-w-0 flex-1">
                                                    <h3 className="font-semibold leading-snug text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                        {post.title}
                                                    </h3>
                                                    {post.description && (
                                                        <p className="mt-1 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                                                            {post.description}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="shrink-0 pt-0.5 text-right text-sm tabular-nums text-neutral-400 dark:text-neutral-500">
                                                    <Date dateString={post.date} pattern="MMM d" />
                                                    <div className="text-xs">{post.readingTime} min</div>
                                                </div>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        ))}
                    </div>
                )}
            </section>
        </Layout>
    )
}
