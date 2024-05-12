import React, { HTMLAttributes } from 'react';
import { CustomImage } from '../image/CustomImage';

interface CardProps extends HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

interface TitleProps extends HTMLAttributes<HTMLDivElement> {
  children: string;
}

interface ContentProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Card = ({ children, ...rest }: CardProps) => {
  return (
    <button
      {...rest}
      className="flex flex-col min-h-72 border rounded-lg w-full max-w-80 hover:shadow-2xl transition-all duration-500"
    >
      {children}
    </button>
  );
};

const Title = ({ children, ...rest }: TitleProps) => {
  return <h2 {...rest}>{children}</h2>;
};

const Content = ({ children, ...rest }: ContentProps) => {
  return <div {...rest}>{children}</div>;
};

const Chip = ({ children, ...rest }: ContentProps) => {
  return <div {...rest}>{children}</div>;
};

export { Card };

Card.Root = Card;
Card.Title = Title;
Card.Content = Content;
Card.Chip = Chip;
Card.Image = CustomImage;
