import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Ubuntu } from "@next/font/google";

const ubuntu = Ubuntu({
  weight: "400",
  subsets: ["latin"],
});
// use to configure global.css, only in this file
export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={ubuntu.className}>
      <Component {...pageProps} />
    </main>
  );
}
