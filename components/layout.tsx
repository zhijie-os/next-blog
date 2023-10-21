import Head from 'next/head'
import Image from 'next/image'
// import styles from "../styles/layout.module.css"
// import utilStyles from "../styles/utils.module.css"
import Link from 'next/link'
import Navbar from './navbar'
import Footer from './footer'
import LinkBar from './linkbar'
import { Analytics } from '@vercel/analytics/react';
import ScrollTop from './scrollTop'

export const siteTitle = "Zhijie Xia | UCalgary"

export default function Layout({ children, home }: { children: any, home: any }) {

    return (
        <div className="flex h-screen flex-col">
            <Head>
                <link rel="icon" href="/robot.svg" />
                <title>Zhijie Xia | UCalgary</title>
                {/* for SEO */}
                <meta name="description" content="Zhijie Xia at University of Calgary" />
                <meta name="robots" content="all" />
                {/* <meta property="og:image" content={``}></meta> */}
            </Head>

            {/* <div "flex flex-col "></div> */}
            <Navbar></Navbar>
            <header className="flex justify-center">
                {home ? (
                    <>
                        <div className="flex flex-col">
                            <div className="flex justify-center m-1">
                                <Image
                                    priority
                                    src="/images/avatar.jpg"
                                    className="rounded-full"
                                    height={144}
                                    width={144}
                                    alt=""
                                ></Image>
                            </div>
                            <div className="flex ml-2">“That which we need the most will be found where we least want to look.” -  Carl Jung.</div>

                            <LinkBar></LinkBar>
                        </div>

                    </>
                ) : (
                    <>
                        <div className="flex flex-col">
                            <div className="flex justify-center m-1">
                                <Link href="/">
                                    <Image
                                        priority
                                        className="rounded-full"
                                        src="/images/avatar.png"
                                        height={88}
                                        width={88}
                                        alt=""
                                    />
                                </Link>
                            </div>
                            <div className="flex ml-2">“That which we need the most will be found where we least want to look.” -  Carl Jung.</div>
                        </div>
                    </>
                )
                }
            </header>
            <main className='flex justify-center items-center p-4 mb-auto'>
                {children}
                <Analytics />
            </main>

            <ScrollTop></ScrollTop>


            {/* {!home && (
                <div >
                    <Link href="/">← Back to home</Link>
                </div>
            )
            } */}
            <Footer></Footer>
        </div >
    )
}