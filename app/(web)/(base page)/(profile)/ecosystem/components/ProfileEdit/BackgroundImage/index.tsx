import Image from 'next/image';
import { FC } from 'react';

interface BackgroundImageProps {
  url: string;
}

const BackgroundImage: FC<BackgroundImageProps> = ({ url }) => {
  return (
    <div className="w-full z-50 overflow-hidden rounded-t-[10px]">
      <div className="w-full h-[210px] relative">
        <div className="w-full h-full">
          <Image fill alt="background image" src={url}></Image>
        </div>
      </div>
    </div>
  );
};

export default BackgroundImage;
