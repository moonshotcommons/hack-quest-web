import Image from 'next/image';
import { FC, useContext, useRef, useState } from 'react';

interface BackgroundImageProps {}

const BackgroundImage: FC<BackgroundImageProps> = (props) => {
  return (
    <div className="w-full z-50 overflow-hidden rounded-t-[10px]">
      <div className="w-full h-[210px] relative">
        <div className="w-full h-full">
          {/* {Object.keys(profile).includes('backgroundImage') && */}
          {/* // !profile?.backgroundImage && ( */}
          <Image
            fill
            alt="background image"
            src={'/images/user/test_background.png'}
          ></Image>
          {/* // )} */}
          {/* {profile?.backgroundImage && (
            <Image
              fill
              alt="background image"
              src={profile.backgroundImage || ''}
            ></Image>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default BackgroundImage;
