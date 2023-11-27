import {Worker} from "@react-pdf-viewer/core";
// Import the main component
import { Viewer } from '@react-pdf-viewer/core';
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';



type ModalProps = {
    showModal: boolean;
    updateShowModal:() => void;
}

export default function Modal({showModal, updateShowModal}:ModalProps) {
    if (!showModal) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
        <div className="relative top-20 mx-auto p-5 border w-98 shadow-lg rounded-md bg-white">
           <div className="mt-3 text-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">RealityCanvas: Augmented Reality Sketching for Embedded and Responsive
        Scribble Animation Effects
            </h3>

            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <div
                style={{
                    border: '1px solid rgba(0, 0, 0, 0.3)',
                    height: '750px',
                }}
            >
                <Viewer fileUrl="/reality-canvas.pdf" />
            </div>
            </Worker>

            <div className="items-center px-4 py-3">
              <button 
                onClick={(e)=>{e.stopPropagation();updateShowModal()}} 
                className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    )
}