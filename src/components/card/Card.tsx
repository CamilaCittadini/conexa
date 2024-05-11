import React from 'react';
import { CustomImage } from '../image/CustomImage';

const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-72 border rounded-lg w-full max-w-80 hover:shadow-2xl">
      {children}
    </div>
  );
};

const Title = ({
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement> & { children: string }) => {
  return <h2 {...rest}>{children}</h2>;
};

const Content = ({
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement> & { children: React.ReactNode }) => {
  return <div {...rest}>{children}</div>;
};

const Chip = ({
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement> & { children: React.ReactNode }) => {
  return <div {...rest}>{children}</div>;
};

export { Card };

Card.Root = Card;
Card.Title = Title;
Card.Content = Content;
Card.Chip = Chip;
Card.Image = CustomImage;
