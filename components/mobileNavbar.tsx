import { useState } from "react";
import Link from "next/link";
import ThemeSwitch from "./ThemeSwitch";

const headerNavLinks: { title: string; href: string }[] = [
  { title: "Home", href: "/" },
  { title: "Blog", href: "/posts" },
];

export default function MobileNavbar() {
  const [navShow, setNavShow] = useState(false);

  const onToggleNav = () => {
    setNavShow((status) => {
      if (status) {
        document.body.style.overflow = "auto";
      } else {
        document.body.style.overflow = "hidden";
      }
      return !status;
    });
  };

  return (
    <div className="sm:hidden flex items-center">
      <ThemeSwitch />
      <button
        type="button"
        className="ml-1 rounded py-1 px-2"
        onClick={onToggleNav}
        aria-label="Toggle Menu"
      >
        <svg className="h-5 w-5 text-neutral-700 dark:text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {navShow ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      <div
        className={`fixed top-0 left-0 z-10 h-full w-full transform bg-white/95 dark:bg-neutral-900/95 backdrop-blur duration-300 ease-in-out ${
          navShow ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button
            type="button"
            className="rounded p-2"
            aria-label="Close Menu"
            onClick={onToggleNav}
          >
            <svg className="h-6 w-6 text-neutral-700 dark:text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="flex flex-col items-center mt-16 gap-6">
          {headerNavLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="text-2xl font-semibold tracking-tight text-neutral-800 dark:text-neutral-200 hover:no-underline"
              onClick={onToggleNav}
            >
              {link.title}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
