import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Ubuntu } from "@next/font/google";
import { Worker } from "@react-pdf-viewer/core";

const ubuntu = Ubuntu({
  weight: "400",
  subsets: ["latin"],
});
// use to configure global.css, only in this file
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
      <main className={ubuntu.className}>
        <Component {...pageProps} />
      </main>
    </Worker>
  );
}
