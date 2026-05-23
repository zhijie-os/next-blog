import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Date from '../../components/date'
import React, { useState, useEffect, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { nord } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { siteUrl } from '../../components/layout'

export default function Post({ postData }) {
    const [activeId, setActiveId] = useState('');
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        setIsDark(document.documentElement.classList.contains('dark'));
        const observer = new MutationObserver(() => {
            setIsDark(document.documentElement.classList.contains('dark'));
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        return () => observer.disconnect();
    }, []);

    const headings = useMemo(() => {
        const matches = [...postData.content.matchAll(/^(#{2,3})\s+(.+)$/gm)];
        return matches.map((m) => {
            const level = m[1].length;
            const text = m[2];
            const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            return { level, text, id };
        });
    }, [postData.content]);

    useEffect(() => {
        if (headings.length === 0) return;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '-80px 0px -80% 0px' }
        );

        headings.forEach((h) => {
            const el = document.getElementById(h.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [headings]);

    const postUrl = `${siteUrl}/posts/${postData.id}`;
    const syntaxTheme = isDark ? nord : oneLight;

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: postData.title,
        datePublished: postData.date,
        dateModified: postData.date,
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
    };

    return (
        <Layout
            metaTitle={postData.title}
            metaDescription={postData.description || `${postData.title} — Zhijie Xia`}
            ogType="article"
            ogUrl={postUrl}
            canonical={postUrl}
            showMiniAvatar
        >
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="flex flex-col lg:flex-row gap-6 py-8">
                {headings.length > 0 && (
                    <aside className="hidden lg:block w-36 flex-shrink-0">
                        <nav className="sticky top-8">
                            <h3 className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-500 mb-2 uppercase tracking-wider">
                                On this page
                            </h3>
                            <ul className="space-y-0.5 border-l-2 border-neutral-200 dark:border-neutral-800">
                                {headings.map((h) => (
                                    <li key={h.id}>
                                        <a
                                            href={`#${h.id}`}
                                            className={`block text-[13px] leading-snug py-0.5 transition-colors hover:no-underline truncate ${
                                                h.level === 3 ? 'pl-3' : 'pl-2'
                                            } ${
                                                activeId === h.id
                                                    ? 'text-blue-600 dark:text-blue-400 border-l-2 -ml-[2px] border-blue-600 dark:border-blue-400 font-medium'
                                                    : 'text-neutral-400 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200'
                                            }`}
                                        >
                                            {h.text}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </aside>
                )}

                <article className="min-w-0 flex-1">
                    <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                        {postData.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-2 mt-3 text-sm text-neutral-500 dark:text-neutral-400">
                        <Date dateString={postData.date} />
                        <span>{postData.readingTime} min read</span>
                    </div>

                    {postData.tags && postData.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3 mb-5">
                            {postData.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    <div className="post-content">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                code({ node, inline, className, children, ...props }) {
                                    const match = /language-(\w+)/.exec(className || '')
                                    return !inline && match ? (
                                        <SyntaxHighlighter
                                            showLineNumbers={true}
                                            showInlineLineNumbers={true}
                                            wrapLines={true}
                                            style={syntaxTheme}
                                            language={match[1]}
                                            PreTag="div"
                                            {...props}
                                        >{String(children).replace(/\n$/, '')}</SyntaxHighlighter>
                                    ) : (
                                        <code className='mx-0.5 bg-neutral-100 dark:bg-neutral-800 text-rose-600 dark:text-rose-400 rounded px-1 py-0.5 text-sm font-mono' {...props}>
                                            {children}
                                        </code>
                                    )
                                },
                                h2: ({ node, children, ...props }) => {
                                    const id = String(children).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                                    return <h2 id={id} {...props}>{children}</h2>;
                                },
                                h3: ({ node, children, ...props }) => {
                                    const id = String(children).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                                    return <h3 id={id} {...props}>{children}</h3>;
                                },
                            }}>{postData.content}</ReactMarkdown>
                    </div>
                </article>
            </div>
        </Layout>
    )
}

export async function getStaticPaths() {
    const paths = getAllPostIds()
    return {
        paths,
        fallback: 'blocking'
    }
}

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id)
    return {
        props: { postData },
        revalidate: 3600,
    }
}
