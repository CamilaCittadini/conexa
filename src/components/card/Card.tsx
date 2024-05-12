import React, { HTMLAttributes } from 'react';
import { CustomImage } from '../image/CustomImage';
import classNames from 'classnames';

export interface CardProps extends HTMLAttributes<HTMLButtonElement> {
  selected: boolean;
  disabled: boolean;
  children: React.ReactNode;
}

interface TitleProps extends HTMLAttributes<HTMLDivElement> {
  children: string;
}

interface ContentProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface ChipProps {
  item: string;
  content: string;
  selected: boolean;
}

const Card = ({ children, disabled, selected, ...rest }: CardProps) => {
  return (
    <button
      {...rest}
      disabled={disabled}
      className={classNames(
        'flex flex-col min-h-72 border-4 rounded-lg w-full hover:shadow-2xl transition-all duration-500',
        {
          'bg-green-100 border-green-600': selected,
          'border-green-100': !selected,
          'bg-gray-200 border-gray-300 hover:shadow-none opacity-50': disabled,
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

const Chip = ({ item, content, selected }: ChipProps) => {
  return (
    <p>
      <span
        className={classNames('text-xs uppercase', {
          'text-green-600': selected,
          'text-gray-500': !selected,
        })}
      >{`${item}: `}</span>
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
