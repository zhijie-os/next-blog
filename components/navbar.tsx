import Link from "next/link";
import MobileNavbar from "./mobileNavbar";
import Image from "next/image";
const headerNavLinks: { title: string; href: string }[] = [
  { title: "HOME", href: "/" },
  { title: "DEV", href: "/dev" },
  { title: "LIFE", href: "/life" },
  { title: "PROJECT", href: "/projects" },
  { title: "GALLERY", href: "/gallery" },
];
import { useState, useEffect } from "react";

export default function Navbar() {
  const [src, setSrc] = useState("/signature.svg");
  function isDarkMode() {
    // Check if the browser prefers dark mode
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  useEffect(() => {
    if (isDarkMode()) setSrc("/signature-white.svg");
  }, []);

  return (
    <div className="flex justify-between">
      <div className="md:mx-auto flex items-center p-4">
        <Link href="/">
          <Image src={src} alt="logo" width={144} height={144} />
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
  );
}
