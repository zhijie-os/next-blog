import Link from "next/link";
import MobileNavbar from "./mobileNavbar";
import Image from "next/image";
const headerNavLinks: { title: string; href: string }[] = [{ title: "Home", href: "/" }, { title: "Blog", href: "/posts" }, { title: "Projects", href: "/projects" }]

export default function Navbar() {
    return (
        <div className="flex justify-between">
            <div className="flex items-center">
                <Image 
                    src="/linux.svg" 
                    alt="logo" 
                    width={80} 
                    height={80}/>
                <h1 className="text-3xl text-white">Keep Coding!</h1>
            </div>

            <div className="flex items-center text-base leading-5">
                <div className="hidden sm:block">
                    {headerNavLinks.map((link) => (
                        <Link
                            key={link.title}
                            href={link.href}
                            className="p-1 font-medium sm:p-4"
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