import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { FiArrowLeft, FiDownload } from 'react-icons/fi'
import Layout, { siteUrl } from '../../components/layout'
import Modal from '../../components/modal'
import { SheetPreview } from '../../components/PdfPreview'
import { getCheatSheets } from '../../lib/cheatsheet'
import type { CheatSheet } from '../../lib/cheatsheet'

export async function getStaticProps() {
    return {
        props: { sheets: getCheatSheets() },
        revalidate: 3600,
    }
}

function sheetMeta(sheet: CheatSheet): string {
    const size = sheet.sizeKB >= 1024 ? `${(sheet.sizeKB / 1024).toFixed(1)} MB` : `${sheet.sizeKB} KB`
    const pages = sheet.pages ? `${sheet.pages} page${sheet.pages === 1 ? '' : 's'}` : null
    return [pages, 'PDF', size].filter(Boolean).join(' · ')
}

export default function RLCheatSheetPage({ sheets }: { sheets: CheatSheet[] }) {
    const [openId, setOpenId] = useState<string | null>(null)
    const open = sheets.find((s) => s.id === openId)

    // #<id> opens that sheet, so a single sheet can be linked to.
    useEffect(() => {
        const fromHash = () => {
            const id = decodeURIComponent(window.location.hash.slice(1))
            setOpenId(sheets.some((s) => s.id === id) ? id : null)
        }
        fromHash()
        window.addEventListener('hashchange', fromHash)
        return () => window.removeEventListener('hashchange', fromHash)
    }, [sheets])

    const show = useCallback((id: string | null) => {
        setOpenId(id)
        const url = id ? `#${encodeURIComponent(id)}` : window.location.pathname + window.location.search
        window.history.replaceState(window.history.state, '', url)
    }, [])

    // With an odd count the first sheet spans both columns, so rows stay full.
    const featureFirst = sheets.length % 2 === 1

    return (
        <Layout
            metaTitle="RL Cheat Sheet | Zhijie Xia"
            metaDescription="Visual summaries of reinforcement learning algorithms by Zhijie Xia, one PDF each: PPO, SAC, target networks and more."
            ogType="website"
            canonical={`${siteUrl}/posts/rl-cheat-sheet`}
            showMiniAvatar
            wide
        >
            <section className="pt-8 pb-16 sm:pt-10">
                <Link
                    href="/posts"
                    className="group inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:no-underline transition-colors"
                >
                    <FiArrowLeft className="group-hover:-translate-x-0.5 transition-transform" />
                    All posts
                </Link>

                <h1 className="mt-8 text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
                    RL Cheat Sheet
                </h1>
                <p className="mt-3 max-w-2xl text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
                    Visual summaries of reinforcement learning algorithms, one PDF each. Open a sheet to read
                    it, or download it for later.
                </p>
                <p className="mt-3 text-sm text-neutral-400 dark:text-neutral-500">
                    {sheets.length} sheet{sheets.length === 1 ? '' : 's'}
                </p>

                {sheets.length === 0 ? (
                    <p className="mt-12 text-sm text-neutral-500 dark:text-neutral-400">No cheat sheets yet.</p>
                ) : (
                    <ul className="mt-12 grid gap-x-10 gap-y-14 sm:grid-cols-2">
                        {sheets.map((sheet, i) => {
                            const featured = featureFirst && i === 0
                            return (
                                <li key={sheet.id} id={sheet.id} className={featured ? 'sm:col-span-2' : ''}>
                                    <button
                                        type="button"
                                        onClick={() => show(sheet.id)}
                                        aria-label={`Open the ${sheet.title} cheat sheet`}
                                        className="group block w-full text-left"
                                    >
                                        <SheetPreview
                                            sheet={sheet}
                                            sizes={featured ? '(min-width: 896px) 860px, 100vw' : '(min-width: 640px) 420px, 100vw'}
                                            priority={i < 2}
                                        />
                                        <span className="mt-3 flex items-baseline justify-between gap-4">
                                            <span
                                                className={`font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors ${
                                                    featured ? 'text-2xl' : 'text-xl'
                                                }`}
                                            >
                                                {sheet.title}
                                            </span>
                                            <span className="shrink-0 text-xs tabular-nums text-neutral-400 dark:text-neutral-500">
                                                {sheetMeta(sheet)}
                                            </span>
                                        </span>
                                        {sheet.subtitle && (
                                            <span className="mt-0.5 block text-sm font-medium text-neutral-500 dark:text-neutral-400">
                                                {sheet.subtitle}
                                            </span>
                                        )}
                                        {sheet.description && (
                                            <span className="mt-2 block text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                                                {sheet.description}
                                            </span>
                                        )}
                                    </button>
                                    <a
                                        href={sheet.pdf}
                                        download
                                        className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 hover:no-underline transition-colors"
                                    >
                                        <FiDownload />
                                        Download PDF
                                    </a>
                                </li>
                            )
                        })}
                    </ul>
                )}
            </section>

            <Modal
                showModal={!!open}
                updateShowModal={() => show(null)}
                title={open ? `${open.title} cheat sheet` : ''}
                pdfUrl={open?.pdf ?? ''}
                coverSrc={open?.preview?.src}
            />
        </Layout>
    )
}
