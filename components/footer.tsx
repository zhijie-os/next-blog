import Link from 'next/link'

export default function Footer() {
    return (
        <footer className="py-8">
            <div className="flex justify-center items-center gap-4 text-sm text-neutral-400 dark:text-neutral-500">
                <Link href="/">Home</Link>
                <span>/</span>
                <Link href="/posts">Blog</Link>
                <span>/</span>
                <Link href="/gallery">Gallery</Link>
                <span>/</span>
                <a href="/rss.xml">RSS</a>
            </div>
            <div className="flex justify-center mt-3 text-xs text-neutral-400 dark:text-neutral-600">
                <span>Zhijie Xia &copy; {new Date().getFullYear()}</span>
            </div>
        </footer>
    )
}
