import Head from 'next/head'
import Image from 'next/image'
// import styles from "../styles/layout.module.css"
// import utilStyles from "../styles/utils.module.css"
import Link from 'next/link'
import Navbar from './navbar'


const name = "Zhijie Xia"
export const siteTitle = "Zhijie Xia | UCalgary"

export default function Layout({ children, home }: { children: any, home: any }) {
    return (
        <div className="flex h-screen flex-col justify-between">
            <Head>
                <link rel="icon" href="/robot.svg" />
                <meta name="description" content="Zhijie Xia at University of Calgary" />
                {/* <meta property="og:image" content={``}></meta> */}
            </Head>

            {/* my big ugly face */}
            <Navbar></Navbar>
            <header>
                {home ? (
                    <>
                        <Image
                            priority
                            src="/images/avatar.png"
                            className="rounded-full"
                            height={144}
                            width={144}
                            alt=""
                        >
                        </Image>
                        <h1 >Zhijie Xia</h1>
                    </>
                ) : (
                    <>
                        <Link href="/">
                            <Image
                                priority
                                src="/images/avatar.png"
                                height={108}
                                width={108}
                                alt=""
                            />
                        </Link>
                        <h2 >
                            <Link href="/" >
                                {name}
                            </Link>
                        </h2>
                    </>
                )

                }
            </header>
            <main>
                {children}
            </main>
            {/* {!home && (
                <div >
                    <Link href="/">← Back to home</Link>
                </div>
            )
            } */}
        </div>
    )
}