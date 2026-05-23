import { Worker, Viewer, SpecialZoomLevel } from "@react-pdf-viewer/core";
import '@react-pdf-viewer/core/lib/styles/index.css';
import { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
    showModal: boolean;
    updateShowModal: () => void;
    title: string;
    pdfUrl: string;
}

export default function Modal({ showModal, updateShowModal, title, pdfUrl }: ModalProps) {
    const [mounted, setMounted] = useState(false);
    const [isDark, setIsDark] = useState(false);
    const [loading, setLoading] = useState(true);

    // Detect dark mode
    useEffect(() => {
        const check = () => setIsDark(document.documentElement.classList.contains('dark'));
        check();
        const obs = new MutationObserver(check);
        obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        return () => obs.disconnect();
    }, []);

    // Portal mounting + body scroll lock
    useEffect(() => {
        setMounted(true);
        if (showModal) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [showModal]);

    // Esc to close
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') updateShowModal();
    }, [updateShowModal]);

    useEffect(() => {
        if (showModal) {
            window.addEventListener('keydown', handleKeyDown);
            return () => window.removeEventListener('keydown', handleKeyDown);
        }
    }, [showModal, handleKeyDown]);

    // Reset loading state when modal opens
    useEffect(() => {
        if (showModal) setLoading(true);
    }, [showModal]);

    if (!showModal || !mounted) return null;

    const modalJSX = (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
                onClick={updateShowModal}
            />

            {/* Modal Container */}
            <div className="relative w-full max-w-6xl h-[95vh] sm:h-[90vh] bg-white dark:bg-neutral-900 shadow-2xl rounded-xl overflow-hidden flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 dark:border-neutral-800 flex-shrink-0">
                    <div className="flex items-center gap-3 min-w-0">
                        <h3 className="text-base sm:text-lg font-semibold text-neutral-900 dark:text-neutral-100 truncate">
                            {title}
                        </h3>
                        {loading && (
                            <div className="h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin flex-shrink-0" />
                        )}
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                        {/* Download button */}
                        <a
                            href={pdfUrl}
                            download
                            onClick={(e) => e.stopPropagation()}
                            className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors"
                            title="Download PDF"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                        </a>
                        {/* Close button */}
                        <button
                            onClick={(e) => { e.stopPropagation(); updateShowModal(); }}
                            className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors"
                            title="Close (Esc)"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* PDF Viewer Area */}
                <div className="flex-1 bg-neutral-100 dark:bg-neutral-800 overflow-auto">
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                        <div className="h-full w-full">
                            <Viewer
                                fileUrl={pdfUrl}
                                defaultScale={SpecialZoomLevel.PageWidth}
                                renderLoader={(percentages) => (
                                    <div className="flex flex-col items-center justify-center h-full gap-3">
                                        <div className="h-8 w-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                                        <span className="text-sm text-neutral-500 dark:text-neutral-400">
                                            Loading PDF{percentages > 0 ? ` (${Math.round(percentages)}%)` : ''}...
                                        </span>
                                    </div>
                                )}
                                onDocumentLoad={() => setLoading(false)}
                                theme={isDark ? 'dark' : 'light'}
                            />
                        </div>
                    </Worker>
                </div>

                {/* Footer bar */}
                <div className="flex items-center justify-between px-4 py-2 border-t border-neutral-200 dark:border-neutral-800 text-xs text-neutral-400 dark:text-neutral-500 flex-shrink-0">
                    <span>Press <kbd className="px-1 py-0.5 rounded bg-neutral-200 dark:bg-neutral-700 font-mono text-[11px]">Esc</kbd> to close</span>
                    <span>Scroll to navigate pages</span>
                </div>
            </div>
        </div>
    );

    return createPortal(modalJSX, document.body);
}
