import { getSortedPostsData } from "../lib/posts"
import Link from "next/link"
import Date from "../components/date"
import Layout from "../components/layout"
import Head from "next/head"

export async function getStaticProps() {
    const allPostsData = getSortedPostsData()
    return {
        props: {
            allPostsData
        }
    }
}

export default function Posts({ allPostsData }: { allPostsData: any }) {
    return (
        <Layout home={false}>
            <Head>
                <title>Blog Posts | Zhijie Xia</title>
            </Head>

            <div className="max-w-4xl flex flex-col pb-8">
                <div className="space-y-2  md:space-y-5 divide-y divide-gray-700 ">
                    <h1 className="m-4 text-3xl font-extrabold leading-tracking-tight text-gray-100 sm:leading-10 md:text-4xl md:leading-14">
                        Blog
                    </h1>
                    <div className="m-4 flex flex-col divide-y divide-gray-700">
                        {allPostsData.map(({ id, date, title }: { id: string, date: string, title: string }) => (
                            <li className="m-2 text-xl" key={id}>
                                <Link href={`/posts/${id}`}>{title}</Link>
                                <br />
                                <small >
                                    <Date dateString={date} />
                                </small>
                            </li>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>

    )
}