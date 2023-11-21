import Link from "next/link";
import MobileNavbar from "./mobileNavbar";
import Image from "next/image";
const headerNavLinks: { title: string; href: string }[] = [{ title: "HOME", href: "/" }, { title: "BLOG", href: "/posts" }, { title: "PROJECT", href: "/projects" },  {title:"GALLERY", href:"/gallery"}]

export default function Navbar() {
    return (
        <div className="flex justify-between">
            <div className="md:mx-auto flex items-center p-4">
                <Link href="/"><Image 
                    src="/signature-white.svg" 
                    alt="logo" 
                    width={144} 
                    height={144}
                    className="signature-toggle"
                    />
                </Link>
                <Link href="/"><Image 
                    src="/signature.svg" 
                    alt="logo" 
                    width={144} 
                    height={144}
                    className="dark:hidden"
                    />
                </Link>
                {/* <h1 className="text-3xl text-white">Keep Coding!</h1> */}
            </div>

            <div className="md:mx-auto flex items-center text-base leading-5">
                <div className="hidden sm:block">
                    {headerNavLinks.map((link) => (
                        <Link
                            key={link.title}
                            href={link.href}
                            className="font-medium sm:p-4 "
                        >
                            {link.title}
                        </Link>
                    ))}
                </div>
                {/* <ThemeSwitch /> */}
                <MobileNavbar />
            </div>
        </div>
    )
}