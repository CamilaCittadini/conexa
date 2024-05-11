import React from 'react';
import Image, { ImageProps } from 'next/image';

const CustomImage = (props: ImageProps) => {
  return (
    <div className="relative w-full h-full flex flex-grow">
      <Image fill {...props} />
    </div>
  );
};

export { CustomImage };
