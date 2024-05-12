import React from 'react';
import Image, { ImageProps } from 'next/image';

const CustomImage = (props: ImageProps) => {
  return (
    <div className="relative w-full h-full flex flex-grow border-t-md">
      <Image
        fill
        {...props}
        className="object-cover"
        style={{ borderTopLeftRadius: 6, borderTopRightRadius: 6 }}
      />
    </div>
  );
};

export { CustomImage };
