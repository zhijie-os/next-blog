import '../styles/globals.css'
import type { AppProps } from 'next/app'

// use to configure global.css, only in this file
export default function App({ Component, pageProps }: AppProps) {
  return (<Component {...pageProps} />)
}
