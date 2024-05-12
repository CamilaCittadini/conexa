import classNames from 'classnames';
import React from 'react';

export enum GridType {
  container = 'container',
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
      className={classNames(
        'grid gap-4 justify-items-center w-full bg-white rounded-lg p-4',
        {
          'grid-cols-2': type === GridType.container,
          'grid-cols-1 lg:grid-cols-2': type === GridType.characters,
          'lg:grid-cols-3 grid-cols-1': type === GridType.episodes,
        }
      )}
    >
      {children}
    </div>
  );
};

export { Grid };
