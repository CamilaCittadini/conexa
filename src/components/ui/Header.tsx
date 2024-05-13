import React from 'react';
import { CustomImage } from '../image/CustomImage';

const Header = () => {
  return (
    <header className="border-t-solid border-t w-full p-4 bg-green-300 flex items-center justify-center">
      <div className="h-14 w-[calc(2.91*56px)] lg:h-32 lg:w-[calc(2.91*128px)]">
        <CustomImage src="/rickAndMorty.png" alt="rick and morty" />
      </div>
    </header>
  );
};

export { Header };
