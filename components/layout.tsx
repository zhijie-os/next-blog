import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Navbar from "./navbar";
import Footer from "./footer";
import LinkBar from "./linkbar";
import { Analytics } from "@vercel/analytics/react";
import ScrollTop from "./scrollTop";
import dynamic from "next/dynamic";

// Dynamically import Avatar3D with SSR disabled
// Note: Changed bg-slate-100 to bg-transparent for a seamless transition
const Avatar3D = dynamic(() => import("./Avatar3D"), { 
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-transparent text-xs text-slate-400">
      Loading...
    </div>
  )
});

export const siteTitle = "Zhijie Xia";

export default function Layout({
  children,
  home,
}: {
  children: any;
  home: any;
}) {
  return (
    <div className="flex h-screen flex-col">
      <Head>
        <link rel="icon" href="/robot.svg" />
        <title>Zhijie Xia</title>
        <meta
          name="description"
          content="Zhijie Xia at University of Calgary"
        />
        <meta name="robots" content="all" />
      </Head>

      <Navbar />
      
      <header className="flex justify-center">
        {home ? (
          <div className="flex flex-col w-full items-center">
            <div className="flex justify-center w-full my-6 px-4">
              {/* REMOVED: bg-slate-50, shadow-lg, border-slate-100
                  This wrapper is now purely a structural "window" for the canvas.
              */}
              <div className="w-full max-w-3xl h-[400px] md:h-[500px] overflow-hidden cursor-grab active:cursor-grabbing">
                <Avatar3D />
              </div>
            </div>
            <LinkBar />
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="flex justify-center m-1">
              <Link href="/">
                {/* REMOVED: bg-slate-100
                    Small navigation avatar - also transparent.
                */}
                <div className="h-[88px] w-[88px] overflow-hidden rounded-full cursor-pointer">
                  <Avatar3D />
                </div>
              </Link>
            </div>
          </div>
        )}
      </header>

      <main className="flex justify-center items-center p-4 mb-auto">
        {children}
        <Analytics />
      </main>

      <ScrollTop />
      <Footer />
    </div>
  );
}