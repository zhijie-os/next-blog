import Head from 'next/head'
import Image from 'next/image'
// import styles from "../styles/layout.module.css"
// import utilStyles from "../styles/utils.module.css"
import Link from 'next/link'
import Navbar from './navbar'
import Footer from './footer'

const name = "Zhijie Xia"
export const siteTitle = "Zhijie Xia | UCalgary"

export default function Layout({ children, home }: { children: any, home: any }) {
    return (
        <div className="flex h-screen flex-col justify-between">
            <Head>
                <link rel="icon" href="/robot.svg" />
                <title>Zhijie Xia | UCalgary</title>
                <meta name="description" content="Zhijie Xia at University of Calgary" />
                {/* <meta property="og:image" content={``}></meta> */}
            </Head>

            {/* my big ugly face */}
            <Navbar></Navbar>
            <header className="flex justify-center">
                {home ? (
                    <>
                        <div className="flex flex-col">
                            <div className="flex justify-center">
                                <Image
                                    priority
                                    src="/images/avatar.png"
                                    className="rounded-full"
                                    height={144}
                                    width={144}
                                    alt=""
                                ></Image>
                            </div>

                            <div className="flex justify-center">
                                <h1 >Zhijie Xia</h1>
                            </div>
                        </div>

                    </>
                ) : (
                    <>
                        <div className="flex flex-col">
                            <div className="flex justify-center">
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
                        </div>

                    </>
                )
                }
            </header>
            <main className='flex justify-center p-16'>
                {children}
            </main>
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