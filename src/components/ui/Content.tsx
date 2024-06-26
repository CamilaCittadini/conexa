import React from 'react';

interface ContentProps {
  children: React.ReactNode;
}

const Content = ({ children }: ContentProps) => {
  return <div className="w-full lg:px-20 lg:pt-10">{children}</div>;
};

export { Content };
