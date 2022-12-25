import Link from "next/link";


const headerNavLinks:{title:string;href:string}[] = [{title:"Home",href:"/"},{title:"Blog",href:"/blogs"},{title:"Projects",href:"/projects"}]

export default function Navbar() {
    return (
        <div className="flex justify-between">
            <div className="flex">
                Logo
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
                {/* <MobileNav /> */}
            </div>
        </div>
    )
}