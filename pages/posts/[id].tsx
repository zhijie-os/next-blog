import Image from 'next/image'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { FiArrowLeft } from 'react-icons/fi'
import Layout, { siteUrl } from '../../components/layout'
import Date from '../../components/date'
import OnThisPage from '../../components/reading/OnThisPage'
import CodeBlock from '../../components/blog/CodeBlock'
import PostNav from '../../components/blog/PostNav'
import { getAllPostIds, getPostData, getSortedPostsData } from '../../lib/posts'
import { remarkPostHeadings } from '../../lib/markdown'
import type { TocEntry } from '../../lib/markdown'

type Post = {
    id: string
    title: string
    date: string
    lastModified?: string
    description?: string
    tags?: string[]
    readingTime: number
    headings: TocEntry[]
    content: string
}

type PostLink = { id: string; title: string } | null

// Same remark plugins lib/posts.tsx parses with for the TOC, so ids match.
const remarkPlugins = [remarkGfm, remarkMath, remarkPostHeadings]
const rehypePlugins = [[rehypeKatex, { output: 'html' }]] as any

function heading(Tag: 'h2' | 'h3' | 'h4') {
    return function Heading({ node, level, id, children, ...props }: any) {
        return (
            <Tag id={id} {...props}>
                {children}
                {id && (
                    <a href={`#${id}`} className="heading-anchor" aria-label="Link to this section">
                        #
                    </a>
                )}
            </Tag>
        )
    }
}

// Markdown components are module-level so they keep a stable identity.
const components = {
    h2: heading('h2'),
    h3: heading('h3'),
    h4: heading('h4'),
    // CodeBlock renders its own <pre>; don't nest it in another.
    pre: ({ children }: any) => <>{children}</>,
    code({ node, inline, className, children, ...props }: any) {
        if (inline) return <code {...props}>{children}</code>
        const language = /language-([\w+#-]+)/.exec(className || '')?.[1]
        return <CodeBlock code={String(children).replace(/\n$/, '')} language={language} />
    },
    a({ node, href = '', children, ...props }: any) {
        if (href.startsWith('/')) {
            return <Link href={href} {...props}>{children}</Link>
        }
        const external = /^https?:\/\//.test(href)
        return (
            <a href={href} {...props} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                {children}
            </a>
        )
    },
    table: ({ node, ...props }: any) => (
        <div className="table-wrap">
            <table {...props} />
        </div>
    ),
}

export default function PostPage({ postData, older, newer }: {
    postData: Post
    older: PostLink
    newer: PostLink
}) {
    const postUrl = `${siteUrl}/posts/${postData.id}`
    const tags = postData.tags ?? []

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: postData.title,
        datePublished: postData.date,
        dateModified: postData.lastModified || postData.date,
        author: {
            '@type': 'Person',
            name: 'Zhijie Xia',
            url: siteUrl,
        },
        description: postData.description || '',
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': postUrl,
        },
    }

    return (
        <Layout
            metaTitle={postData.title}
            metaDescription={postData.description || `${postData.title} — Zhijie Xia`}
            ogType="article"
            ogUrl={postUrl}
            canonical={postUrl}
        >
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <article className="py-10 sm:py-14">
                <header className="mb-10 sm:mb-12">
                    <Link
                        href="/posts"
                        className="group inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:no-underline transition-colors"
                    >
                        <FiArrowLeft className="group-hover:-translate-x-0.5 transition-transform" />
                        All posts
                    </Link>

                    <h1 className="mt-8 text-3xl sm:text-4xl font-bold tracking-tight leading-tight text-neutral-900 dark:text-neutral-50">
                        {postData.title}
                    </h1>

                    {postData.description && (
                        <p className="mt-4 text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
                            {postData.description}
                        </p>
                    )}

                    <div className="mt-6 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm text-neutral-500 dark:text-neutral-400">
                        <Image
                            src="/images/avatar.jpg"
                            alt=""
                            width={24}
                            height={24}
                            className="rounded-full"
                        />
                        <span className="font-medium text-neutral-800 dark:text-neutral-200">Zhijie Xia</span>
                        <span aria-hidden="true" className="text-neutral-300 dark:text-neutral-600">·</span>
                        <Date dateString={postData.date} pattern="MMM d, yyyy" />
                        <span aria-hidden="true" className="text-neutral-300 dark:text-neutral-600">·</span>
                        <span>{postData.readingTime} min read</span>
                        {postData.lastModified && (
                            <>
                                <span aria-hidden="true" className="text-neutral-300 dark:text-neutral-600">·</span>
                                <span>
                                    Updated <Date dateString={postData.lastModified} pattern="MMM d, yyyy" />
                                </span>
                            </>
                        )}
                    </div>
                </header>

                <div className="relative">
                    {/* The TOC hangs in the right margin so the text column stays centered. */}
                    {postData.headings.length >= 2 && (
                        <div className="absolute left-full top-0 bottom-0 ml-14 hidden xl:block">
                            <OnThisPage headings={postData.headings} className="h-full w-48" />
                        </div>
                    )}
                    <div className="post-content blog-prose">
                        <ReactMarkdown
                            remarkPlugins={remarkPlugins}
                            rehypePlugins={rehypePlugins}
                            components={components}
                        >
                            {postData.content}
                        </ReactMarkdown>
                    </div>
                </div>

                <footer className="mt-16 space-y-8 border-t border-neutral-200 dark:border-neutral-800 pt-8">
                    {tags.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="mr-1 text-[11px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                                Tagged
                            </span>
                            {tags.map((tag) => (
                                <Link
                                    key={tag}
                                    href={`/posts?tag=${encodeURIComponent(tag)}`}
                                    className="rounded-full bg-neutral-100 dark:bg-neutral-800 px-2.5 py-0.5 text-xs font-medium text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 hover:no-underline transition-colors"
                                >
                                    {tag}
                                </Link>
                            ))}
                        </div>
                    )}
                    <PostNav older={older} newer={newer} />
                </footer>
            </article>
        </Layout>
    )
}

export async function getStaticPaths() {
    return {
        paths: getAllPostIds(),
        fallback: 'blocking',
    }
}

export async function getStaticProps({ params }: { params: { id: string } }) {
    const posts = getSortedPostsData()
    const index = posts.findIndex((p: any) => p.id === params.id)
    // Unknown ids and drafts (which the sorted list excludes) are 404s.
    if (index === -1) return { notFound: true }
    const link = (p: any): PostLink => (p ? { id: p.id, title: p.title } : null)
    return {
        props: {
            postData: await getPostData(params.id),
            newer: link(posts[index - 1]),
            older: link(posts[index + 1]),
        },
        revalidate: 3600,
    }
}
