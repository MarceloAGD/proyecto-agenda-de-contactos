import { Html, Head, Main, NextScript } from 'next/document'
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] })

export default function Document() {
  return (
    <Html>
      <Head />
      <body className={inter.className}>
        <div className='global__background'></div>
        <Main/>
        <NextScript />
      </body>
    </Html>
  )
}