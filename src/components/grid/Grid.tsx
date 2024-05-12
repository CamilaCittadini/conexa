import classNames from 'classnames';
import React from 'react';

export enum GridType {
  characters = 'characters',
  episodes = 'episodes',
}
interface GridProps {
  children: React.ReactNode;
  type?: GridType;
}

const Grid = ({ children, type = GridType.characters }: GridProps) => {
  return (
    <div
      className={classNames('grid gap-4 justify-items-center', {
        'grid-cols-2': type === GridType.characters,
        'grid-cols-3': type === GridType.episodes,
      })}
    >
      {children}
    </div>
  );
};

export { Grid };
