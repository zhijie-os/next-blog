import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import React from 'react';
import ReactMarkdown from 'react-markdown';
// import remarkGfm from 'remark-gfm'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { nord } from 'react-syntax-highlighter/dist/cjs/styles/prism'

// @ts-nocheck
export default function Post({ postData }) {
    return (
        <Layout home={false}>
            <Head>
                <title>{postData.title}</title>
                <meta name="description" content={"Zhijie Xia at University of Calgary - Blog Posts - " + postData.title} />
            </Head>
            <article className="post max-w-4xl flex flex-col">
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={postData.date} />
                </div>

                <ReactMarkdown
                    components={{
                        code({ node, inline, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || '')
                            return !inline && match ? (
                                <SyntaxHighlighter
                                    showLineNumbers={true}
                                    showInlineLineNumbers={true} // <-- add this prop!
                                    wrapLines={true}
                                    customStyle={{ width: "calc(100vw - 50px)" }}
                                    style={nord}
                                    language={match[1]}
                                    PreTag="div"
                                    {...props}
                                >{String(children).replace(/\n$/, '')}</SyntaxHighlighter>
                            ) : (
                                <code className='bg-gray-700 bg-opacity-50 text-sky-700 underline decoration-sky-500 rounded-md' {...props}>
                                    {children}
                                </code>
                            )
                        }
                    }}>{postData.content}</ReactMarkdown>
            </article>
        </Layout >
    )
}

export async function getStaticPaths() {
    const paths = getAllPostIds()
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id)
    return {
        props: {
            postData
        }
    }
}
