import { getSortedPostsData } from "../lib/posts"
import Link from "next/link"
import Date from "../components/date"
import Layout from "../components/layout"

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
            <div className="flex flex-col">
                <h2 >Blog</h2>
                <ul >
                    {allPostsData.map(({ id, date, title }: { id: string, date: string, title: string }) => (
                        <li key={id}>
                            <Link href={`/posts/${id}`}>{title}</Link>
                            <br />
                            <small >
                                <Date dateString={date} />
                            </small>
                        </li>
                    ))}
                </ul>
            </div>
        </Layout>

    )
}