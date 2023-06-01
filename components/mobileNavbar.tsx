import { useState } from 'react'
import Link from 'next/link';
const headerNavLinks: { title: string; href: string }[] = [{ title: "HOME", href: "/" }, { title: "BLOG", href: "/posts" }, { title: "PROJECTS", href: "/projects" },{ title: "GALLERY", href: "/gallery" }]
import Image from 'next/image';
export default function MobileNavbar() {
    const [navShow, setNavShow] = useState(false);

    const onToggleNav = () => {
        setNavShow((status) => {
            if (status) {
                document.body.style.overflow = 'auto';
            }
            else {
                // prevent scrolling
                document.body.style.overflow = 'hidden'
            }
            return !status;
        })
    }


    return (
        <div className="sm:hidden">
            {/* toggle button */}
            <button type="button" className="ml-1 mr-1 rounded py-1"
                onClick={onToggleNav}>
                <Image
                    src="/toggle.svg"
                    alt="logo"
                    width={48}
                    height={48} />
            </button>
            <div
                className={`fixed top-0 left-0 z-10 h-full w-full transform bg-gray-200 opacity-95 duration-300 ease-in-out dark:bg-gray-800 ${navShow ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="flex justify-end">
                    <button
                        type="button"
                        className="mr-5 mt-11 h-8 w-8 rounded"
                        aria-label="Toggle Menu"
                        onClick={onToggleNav}
                    >
                        <Image
                            src="/close.svg"
                            alt="logo"
                            width={80}
                            height={80} />
                    </button>
                </div>
                <nav className="fixed mt-8 h-full">
                    {headerNavLinks.map((link) => (
                        <div key={link.title} className="px-12 py-4">
                            <Link
                                href={link.href}
                                className="text-2xl font-bold tracking-widest text-gray-900 dark:text-gray-100"
                                onClick={onToggleNav}
                            >
                                {link.title}
                            </Link>
                        </div>
                    ))}
                </nav>
            </div>
        </div>
    )
}