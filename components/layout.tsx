import Head from 'next/head'
import Image from 'next/image'
import styles from "../styles/layout.module.css"
import utilStyles from "../styles/utils.module.css"
import Link from 'next/link'

const name = "Zhijie Xia"
export const siteTitle = "Zhijie Xia | UCalgary"

export default function Layout({ children, home }: { children: any, home: any }) {
    return (
        <div className={styles.container}>
            <Head>
                <link rel="icon" href="/robot.svg" />
                <meta name="description" content="Zhijie Xia at University of Calgary" />
                {/* <meta property="og:image" content={``}></meta> */}
            </Head>
            <header className={styles.header}>
                {home ? (
                    <>
                        <Image
                            priority
                            src="/images/avatar.png"
                            className={utilStyles.borderCircle}
                            height={144}
                            width={144}
                            alt=""
                        >
                        </Image>
                        <h1 className={utilStyles.heading2Xl}>Zhijie Xia</h1>
                    </>
                ) : (
                    <>
                        <Link href="/">
                            <Image
                                priority
                                src="/images/avatar.png"
                                className={utilStyles.borderCircle}
                                height={108}
                                width={108}
                                alt=""
                            />
                        </Link>
                        <h2 className={utilStyles.headingLg}>
                            <Link href="/" className={utilStyles.colorInherit}>
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
            {!home && (
                <div className={styles.backToHome}>
                    <Link href="/">← Back to home</Link>
                </div>
            )
            }
        </div>
    )
}