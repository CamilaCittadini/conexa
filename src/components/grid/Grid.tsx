import React from 'react';
import classNames from 'classnames';

export enum GridTypeEnum {
  container = 'container',
  characters = 'characters',
  episodes = 'episodes',
}
interface GridProps {
  children: React.ReactNode;
  type?: GridTypeEnum;
}

const Grid = ({ children, type = GridTypeEnum.characters }: GridProps) => {
  return (
    <div
      className={classNames(
        'grid gap-4 justify-items-center w-full bg-white rounded-lg p-4',
        {
          'grid-cols-2 max-w-max-content': type === GridTypeEnum.container,
          'grid-cols-1 lg:grid-cols-2': type === GridTypeEnum.characters,
          'lg:grid-cols-3 grid-cols-1 max-w-max-content':
            type === GridTypeEnum.episodes,
        }
      )}
    >
      {children}
    </div>
  );
};

export { Grid };
