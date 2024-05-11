import React from 'react';

const Grid = ({
  colsNumber,
  children,
}: {
  colsNumber: number;
  children: React.ReactNode;
}) => {
  return <div className={`grid grid-cols-${colsNumber} gap-4`}>{children}</div>;
};

const Column = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center  max-h-[100vh] overflow-y-scroll">
      <div className="h-full w-full">{children}</div>
    </div>
  );
};

export { Grid };

Grid.Root = Grid;
Grid.Column = Column;
