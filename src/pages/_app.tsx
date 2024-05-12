import '@/styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <main className={`${poppins.className} ${inter.className} bg-white`}>
        <Component {...pageProps} />
      </main>
    </QueryClientProvider>
  );
}
