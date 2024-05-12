import React, { HTMLAttributes } from 'react';
import { CustomImage } from '../image/CustomImage';
import classNames from 'classnames';

interface CardProps extends HTMLAttributes<HTMLButtonElement> {
  selected: boolean;
  children: React.ReactNode;
}

interface TitleProps extends HTMLAttributes<HTMLDivElement> {
  children: string;
}

interface ContentProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Card = ({ children, selected, ...rest }: CardProps) => {
  return (
    <button
      {...rest}
      className={classNames(
        'flex flex-col min-h-72 border-4 rounded-lg w-full hover:shadow-2xl transition-all duration-500',
        {
          'bg-slate-200 border-green-600': selected,
          'border-green-100': !selected,
        }
      )}
    >
      {children}
    </button>
  );
};

const Title = ({ children, ...rest }: TitleProps) => {
  return (
    <h2 className="font-semibold" {...rest}>
      {children}
    </h2>
  );
};

const Content = ({ children, ...rest }: ContentProps) => {
  return (
    <div className="p-4 w-full text-left" {...rest}>
      {children}
    </div>
  );
};

const Chip = ({ item, content }: { item: string; content: string }) => {
  return (
    <p>
      <span className="text-xs text-gray-500 uppercase">{`${item}: `}</span>
      <span className="">{content}</span>
    </p>
  );
};

export { Card };

Card.Root = Card;
Card.Title = Title;
Card.Content = Content;
Card.Chip = Chip;
Card.Image = CustomImage;
