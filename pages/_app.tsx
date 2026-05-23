import "../styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main style={{ fontFamily: "'Inter', sans-serif" }}>
      <Component {...pageProps} />
    </main>
  );
}
