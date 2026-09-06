import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import type { MDXRemoteSerializeResult } from 'next-mdx-remote'
// next-mdx-remote v6 compiles with @mdx-js/mdx 3 (unified 11), so the reading
// pipeline uses the unified-11 majors of these plugins via npm aliases. The
// blog (react-markdown 8, unified 10) keeps the plain names.
import remarkGfm from 'remark-gfm-mdx3'
import remarkMath from 'remark-math-mdx3'
import rehypeKatex from 'rehype-katex-mdx3'
import Layout, { siteUrl } from '../../components/layout'
import ReadingSidebar from '../../components/reading/Sidebar'
import OnThisPage from '../../components/reading/OnThisPage'
import PrevNext from '../../components/reading/PrevNext'
import PaperHeader from '../../components/reading/PaperHeader'
import { HEADING_RE, slugify, plainText } from '../../lib/slugify'
import {
    getReadingSlugs,
    getReadingNoteData,
    getSortedReadingNotes,
    getReadingGroups,
    getAdjacentNotes,
} from '../../lib/reading'
import type { ReadingGroup } from '../../lib/reading'

// MDX components are module-level, never in props (they must survive JSON serialization).
const mdxComponents = {
    h2: ({ children }: any) => {
        const id = slugify(plainText(String(children)))
        return <h2 id={id}>{children}</h2>
    },
    h3: ({ children }: any) => {
        const id = slugify(plainText(String(children)))
        return <h3 id={id}>{children}</h3>
    },
    pre: (props: any) => (
        <pre
            className="bg-neutral-50 dark:bg-neutral-800/70 border border-neutral-200 dark:border-neutral-800 rounded-lg my-4 p-4 overflow-x-auto text-[13px] leading-relaxed"
            {...props}
        />
    ),
}

export default function ReadingNotePage({ note, headings, mdxSource, groups, previous, next }: {
    note: any
    headings: { level: number; text: string; id: string }[]
    mdxSource: MDXRemoteSerializeResult
    groups: ReadingGroup[]
    previous: any
    next: any
}) {
    return (
        <Layout
            metaTitle={`${note.title} — Reading | Zhijie Xia`}
            metaDescription={note.description || `${note.title} — reading note`}
            ogType="article"
            ogUrl={`${siteUrl}/reading/${note.slug}`}
            canonical={`${siteUrl}/reading/${note.slug}`}
            showMiniAvatar
            docs
        >
            <div className="flex flex-col lg:flex-row gap-6 py-8">
                <ReadingSidebar groups={groups} activeSlug={note.slug} />

                <main className="min-w-0 flex-1 max-w-3xl">
                    <article>
                        <PaperHeader note={note} />
                        <div className="post-content">
                            <MDXRemote {...mdxSource} components={mdxComponents} />
                        </div>
                    </article>
                    <PrevNext previous={previous} next={next} />
                </main>

                {headings.length > 0 && (
                    <OnThisPage headings={headings} className="hidden xl:block" />
                )}
            </div>
        </Layout>
    )
}

export async function getStaticPaths() {
    const paths = getReadingSlugs().map((slug) => ({ params: { slug } }))
    return {
        paths,
        fallback: 'blocking',
    }
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
    const note = getReadingNoteData(params.slug)
    if (!note) return { notFound: true }

    const allNotes = getSortedReadingNotes()
    const adjacent = getAdjacentNotes(params.slug, allNotes)
    const toNavLink = (n: typeof adjacent.previous) => (n ? { slug: n.slug, title: n.title } : null)
    const previous = toNavLink(adjacent.previous)
    const next = toNavLink(adjacent.next)

    // Headings are extracted server-side from the raw markdown — the raw
    // content string never reaches the client (only the compiled MDX does).
    const headings = Array.from(note.content.matchAll(HEADING_RE)).map((m) => ({
        level: m[1].length,
        text: m[2],
        id: slugify(plainText(m[2])),
    }))

    const mdxSource = await serialize(note.content, {
        mdxOptions: {
            remarkPlugins: [remarkGfm, remarkMath],
            // output: 'html' skips the verbose MathML twin; flip to
            // 'htmlAndMathml' if screen-reader support is needed.
            rehypePlugins: [[rehypeKatex, { output: 'html' }]],
        },
    })

    const { content, ...rest } = note
    return {
        props: {
            note: rest,
            headings,
            mdxSource,
            groups: getReadingGroups(allNotes),
            previous,
            next,
        },
        revalidate: 3600,
    }
}
