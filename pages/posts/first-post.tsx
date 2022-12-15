import Link from 'next/link'

export default function FirstPost() {
    return (
        <>
            <h1>First Post</h1>
            <h2>
                {/* Link is used to use javascript navigate between pages, instead of browser reload */}
                <Link href="/">Back to home</Link>
            </h2>
        </>
    )
}