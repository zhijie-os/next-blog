import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Navbar from "./navbar";
import Footer from "./footer";
import { Analytics } from "@vercel/analytics/react";
import ScrollTop from "./scrollTop";

export const siteTitle = "Zhijie Xia";
export const siteUrl = "https://zhijiexia.dev";
export const defaultDescription = "Zhijie Xia — AI Infrastructure Engineer & Researcher, incoming MSc student at University of Alberta.";

interface LayoutProps {
  children: React.ReactNode;
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
  ogType?: string;
  ogUrl?: string;
  canonical?: string;
  showMiniAvatar?: boolean;
  wide?: boolean;
}

export default function Layout({
  children,
  metaTitle,
  metaDescription,
  ogImage,
  ogType = "website",
  ogUrl,
  canonical,
  showMiniAvatar = false,
  wide = false,
}: LayoutProps) {
  const title = metaTitle || siteTitle;
  const description = metaDescription || defaultDescription;
  const image = ogImage || `${siteUrl}/images/avatar.png`;
  const url = ogUrl || siteUrl;

  return (
    <div className="flex min-h-screen flex-col">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="google-site-verification" content="googlefad4f565b8be6920" />

        <link rel="icon" href="/robot.svg" />
        <link rel="canonical" href={canonical || url} />

        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow" />

        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content={ogType} />
        <meta property="og:site_name" content={siteTitle} />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
      </Head>

      <Navbar />

      {showMiniAvatar && (
        <div className="flex justify-center mt-4">
          <Link href="/">
            <div className="h-[60px] w-[60px] overflow-hidden rounded-full cursor-pointer">
              <Image
                src="/images/avatar.jpg"
                alt="Zhijie Xia"
                width={60}
                height={60}
                className="object-cover"
              />
            </div>
          </Link>
        </div>
      )}

      <main className="flex-1 flex justify-center px-4 md:px-8">
        <div className={`w-full ${wide ? 'max-w-4xl' : 'max-w-2xl'}`}>
          {children}
          <Analytics />
        </div>
      </main>

      <ScrollTop />
      <Footer />
    </div>
  );
}
