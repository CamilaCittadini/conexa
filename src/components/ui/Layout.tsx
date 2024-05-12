import React from 'react';
import { Poppins } from 'next/font/google';
import { Footer } from './Footer';
import { Content } from './Content';
import classNames from 'classnames';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={classNames(
        'h-screen flex flex-col justify-between bg-gray-100',
        poppins.className
      )}
    >
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
