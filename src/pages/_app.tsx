import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Poppins, Inter } from 'next/font/google';
import React from 'react';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});
const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${poppins.className} ${inter.className} bg-white`}>
      <Component {...pageProps} />
    </main>
  );
}
