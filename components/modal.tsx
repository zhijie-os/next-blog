import { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { FiDownload, FiExternalLink, FiFileText, FiX } from "react-icons/fi";

type ModalProps = {
    showModal: boolean;
    updateShowModal: () => void;
    title: string;
    pdfUrl: string;
    coverSrc?: string; // shown when the browser can't display PDFs inline
}

// PDFs open in the browser's own viewer (PDFium in Chrome and Edge, PDFKit in
// Safari). pdf.js-based viewers drop glyphs from fonts re-encoded by macOS
// "Save as PDF" (every capital A went missing in ACRL.pdf). Browsers without
// an inline viewer, mostly on Android, get Open and Download instead.
export default function Modal({ showModal, updateShowModal, title, pdfUrl, coverSrc }: ModalProps) {
    const [mounted, setMounted] = useState(false);
    const [inline, setInline] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setMounted(true);
        // Older browsers don't expose the flag; assume they can show PDFs.
        setInline(navigator.pdfViewerEnabled !== false);
    }, []);

    // Body scroll lock while open
    useEffect(() => {
        if (!showModal) return;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, [showModal]);

    // Esc to close (while focus is outside the PDF frame)
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') updateShowModal();
    }, [updateShowModal]);

    useEffect(() => {
        if (showModal) {
            window.addEventListener('keydown', handleKeyDown);
            return () => window.removeEventListener('keydown', handleKeyDown);
        }
    }, [showModal, handleKeyDown]);

    useEffect(() => {
        if (showModal) setLoading(true);
    }, [showModal, pdfUrl]);

    if (!showModal || !mounted) return null;

    const actionClass = "p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors";

    const modalJSX = (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4" role="dialog" aria-modal="true" aria-label={title}>
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
                        {inline && loading && (
                            <div className="h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin flex-shrink-0" />
                        )}
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                        <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className={actionClass} title="Open in a new tab">
                            <FiExternalLink className="w-5 h-5" />
                        </a>
                        <a href={pdfUrl} download className={actionClass} title="Download PDF">
                            <FiDownload className="w-5 h-5" />
                        </a>
                        <button
                            type="button"
                            onClick={updateShowModal}
                            className={actionClass}
                            title="Close (Esc)"
                            autoFocus
                        >
                            <FiX className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* PDF area */}
                <div className="relative flex-1 bg-neutral-100 dark:bg-neutral-800">
                    {inline ? (
                        <iframe
                            key={pdfUrl}
                            src={`${pdfUrl}#view=FitH`}
                            title={title}
                            className="absolute inset-0 h-full w-full"
                            onLoad={() => setLoading(false)}
                        />
                    ) : (
                        <div className="flex h-full flex-col items-center justify-center gap-5 overflow-auto p-6 text-center">
                            {coverSrc ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={coverSrc} alt="" className="max-h-[50vh] w-auto max-w-full rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white shadow-sm" />
                            ) : (
                                <FiFileText className="h-12 w-12 text-neutral-400" />
                            )}
                            <p className="max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
                                This browser can&apos;t show PDFs inside the page. Open it in your PDF viewer or download it.
                            </p>
                            <div className="flex flex-wrap justify-center gap-3">
                                <a
                                    href={pdfUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700 hover:no-underline dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-300"
                                >
                                    <FiExternalLink /> Open PDF
                                </a>
                                <a
                                    href={pdfUrl}
                                    download
                                    className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 hover:no-underline dark:border-neutral-600 dark:text-neutral-200 dark:hover:bg-neutral-800"
                                >
                                    <FiDownload /> Download
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    return createPortal(modalJSX, document.body);
}
