import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { useEffect, useState } from "react";
import { createPortal } from "react-dom"; // 1. Import createPortal

type ModalProps = {
    showModal: boolean;
    updateShowModal: () => void;
    title: string;
    pdfUrl: string;
}

export default function Modal({ showModal, updateShowModal, title, pdfUrl }: ModalProps) {
    const [mounted, setMounted] = useState(false);

    // 2. Ensure we only render on the client side
    useEffect(() => {
        setMounted(true);
        if (showModal) {
            // Optional: Prevent background scrolling when modal is open
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [showModal]);

    if (!showModal || !mounted) return null;

    // 3. Define the Modal JSX
    const modalJSX = (
        /* z-[100] ensures it is above the Navbar (usually z-40 or z-50).
           fixed inset-0 ensures it covers the entire viewport.
        */
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop: click to close */}
            <div 
                className="absolute inset-0 bg-black bg-opacity-70 transition-opacity" 
                onClick={updateShowModal}
            />

            {/* Modal Container */}
            <div className="relative bg-white w-full max-w-5xl h-[90vh] shadow-2xl rounded-xl overflow-hidden flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 truncate pr-4">{title}</h3>
                    <button 
                        onClick={(e) => { e.stopPropagation(); updateShowModal() }} 
                        className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* PDF Viewer Area */}
                <div className="flex-1 bg-gray-100 overflow-auto">
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                        <div className="h-full w-full">
                            <Viewer fileUrl={pdfUrl} />
                        </div>
                    </Worker>
                </div>
            </div>
        </div>
    );

    // 4. Use createPortal to inject the modal at the end of <body>
    return createPortal(modalJSX, document.body);
}