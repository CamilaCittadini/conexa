import React from 'react';

const CardSkeleton = () => {
  return (
    <div className="w-full h-72 border-4 rounded-lg">
      <div className="h-[50%] bg-gray-200 animate-pulse" />
      <div className=" px-4 py-2 flex flex-col gap-2">
        <div className="h-5 w-28 rounded-lg bg-gray-200  animate-pulse" />
        <div className="h-5 w-20 rounded-lg bg-gray-200  animate-pulse" />
        <div className="h-5 w-20 rounded-lg bg-gray-200  animate-pulse" />
        <div className="h-5 w-20 rounded-lg bg-gray-200  animate-pulse" />
      </div>
    </div>
  );
};

export { CardSkeleton };
