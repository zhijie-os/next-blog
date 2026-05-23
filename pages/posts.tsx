import { getSortedPostsData } from "../lib/posts"
import Link from "next/link"
import Date from "../components/date"
import Layout from "../components/layout"
import { useState, useMemo } from "react"
import { siteUrl } from "../components/layout"

export async function getStaticProps() {
    const allPostsData = getSortedPostsData()
    return {
        props: { allPostsData },
        revalidate: 3600,
    }
}

export default function Posts({ allPostsData }: { allPostsData: any }) {
    const [search, setSearch] = useState("")

    const filteredPosts = useMemo(() => {
        if (!search) return allPostsData
        const q = search.toLowerCase()
        return allPostsData.filter((post: any) =>
            post.title.toLowerCase().includes(q) ||
            (post.description || "").toLowerCase().includes(q) ||
            (post.tags || []).some((t: string) => t.toLowerCase().includes(q))
        )
    }, [allPostsData, search])

    return (
        <Layout
            metaTitle="Blog | Zhijie Xia"
            metaDescription="Technical blog posts about LeetCode, CUDA, reinforcement learning, DevOps, and competitive programming."
            ogType="website"
            canonical={`${siteUrl}/posts`}
            showMiniAvatar
        >
            <section className="py-8">
                <h1 className="section-heading">Blog</h1>

                <div className="relative mb-8">
                    <input
                        type="text"
                        placeholder="Search posts..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                    {search && (
                        <button
                            onClick={() => setSearch("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
                        >
                            Clear
                        </button>
                    )}
                </div>

                {filteredPosts.length === 0 ? (
                    <p className="text-neutral-500 dark:text-neutral-400 py-8 text-center text-sm">
                        No posts found.
                    </p>
                ) : (
                    <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
                        {filteredPosts.map(({ id, date, title, description, tags, readingTime }: {
                            id: string; date: string; title: string; description?: string;
                            tags?: string[]; readingTime?: number;
                        }) => (
                            <div key={id} className="py-4">
                                <Link
                                    href={`/posts/${id}`}
                                    className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 hover:text-blue-600 dark:hover:text-blue-400 hover:no-underline"
                                >
                                    {title}
                                </Link>
                                {description && (
                                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
                                        {description}
                                    </p>
                                )}
                                <div className="flex items-center gap-2 mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                                    <Date dateString={date} />
                                    {readingTime && <span>{readingTime} min read</span>}
                                </div>
                                {tags && tags.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mt-2">
                                        {tags.map((tag: string) => (
                                            <span
                                                key={tag}
                                                className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </Layout>
    )
}
