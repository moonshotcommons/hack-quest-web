import Image from 'next/image';
import { FC } from 'react';

interface BackgroundImageProps {
  url: string;
}

const BackgroundImage: FC<BackgroundImageProps> = ({ url }) => {
  return (
    <div className="z-50 w-full overflow-hidden rounded-t-[10px]">
      <div className="relative h-[210px] w-full">
        <div className="h-full w-full">
          <Image fill alt="background image" src={url}></Image>
        </div>
      </div>
    </div>
  );
};

export default BackgroundImage;
