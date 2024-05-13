import React from 'react';
import classNames from 'classnames';
import { Poppins } from 'next/font/google';
import { Footer } from './Footer';
import { Content } from './Content';
import { Header } from './Header';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div
      className={classNames(
        'h-screen flex flex-col justify-between bg-gray-100',
        poppins.className
      )}
    >
      <Header />
      <main
        className="max-h-screen overflow-y-auto"
        style={{ scrollbarGutter: 'stable' }}
      >
        <Content>{children}</Content>
      </main>
      <Footer />
    </div>
  );
};

export { Layout };
