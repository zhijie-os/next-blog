import Link from "next/link";
import MobileNavbar from "./mobileNavbar";
import ThemeSwitch from "./ThemeSwitch";

const headerNavLinks: { title: string; href: string }[] = [
  { title: "Home", href: "/" },
  { title: "Blog", href: "/posts" },
];

export default function Navbar() {
  return (
    <div className="flex justify-between items-center max-w-2xl mx-auto w-full px-4 py-4">
      <Link
        href="/"
        className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 hover:no-underline"
      >
        Zhijie Xia
      </Link>

      <div className="flex items-center gap-1 text-sm">
        <div className="hidden sm:flex items-center">
          {headerNavLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="px-3 py-1.5 font-medium text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors rounded-md hover:no-underline"
            >
              {link.title}
            </Link>
          ))}
          <div className="ml-2">
            <ThemeSwitch />
          </div>
        </div>
        <MobileNavbar />
      </div>
    </div>
  );
}
