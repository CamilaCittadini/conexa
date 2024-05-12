import classNames from 'classnames';
import React from 'react';

const Grid = ({
  children,
  type = 'characters',
}: {
  children: React.ReactNode;
  type?: 'characters' | 'episodes';
}) => {
  return (
    <div
      className={classNames('grid grid-cols-2 gap-4 justify-items-center', {
        '!grid-cols-3': type === 'episodes',
      })}
    >
      {children}
    </div>
  );
};

export { Grid };
