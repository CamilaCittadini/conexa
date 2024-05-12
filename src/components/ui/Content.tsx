import React from 'react';

interface ContentProps {
  children: React.ReactNode;
}

const Content = ({ children }: ContentProps) => {
  return <div className="w-full px-20 pt-10">{children}</div>;
};

export { Content };
