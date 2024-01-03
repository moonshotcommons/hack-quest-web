import React from 'react';
import BannerImg from '@/public/images/home/learning_track_banner.png';
import { bannerTabList } from '../data';
import { SearchInfoType } from '../type';
import Image from 'next/image';

interface BannerProp {
  changeSearchInfo: (val: SearchInfoType) => void;
  searchInfo: SearchInfoType;
}

const Banner: React.FC<BannerProp> = ({ changeSearchInfo, searchInfo }) => {
  const { track } = searchInfo;
  return (
    <div
      className="h-[400px] py-[60px] "
      style={{
        backgroundImage: `url(${BannerImg.src})`,
        backgroundSize: '500px',
        backgroundPosition: 'top right',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'var(--neutral-off-black)'
      }}
    >
      <div className="container mx-auto h-full flex flex-col justify-between">
        <div className="text-h1 text-[var(--neutral-white)]">
          LEARNING TRACKS
        </div>
        <div className="flex gap-[40px]">
          {bannerTabList.map((v) => (
            <div
              key={v.value}
              onClick={() =>
                changeSearchInfo({ ...searchInfo, track: v.value })
              }
              className={`w-[380px] p-[24px] rounded-[24px] cursor-pointer border ${
                track === v.value
                  ? 'bg-[var(--yellow-primary)] border-[var(--neutral-light-gray)]'
                  : 'border-[var(--neutral-off-white)]'
              }`}
            >
              <div
                className={`flex justify-between items-center ${
                  track === v.value
                    ? 'text-[var(--neutral-off-black)]'
                    : 'text-[var(--neutral-white)]'
                }`}
              >
                <span className="text-h3">{v.label}</span>
                <Image
                  src={track === v.value ? v.imgActive : v.img}
                  alt="tab-img"
                  width={48}
                ></Image>
              </div>
              <div
                className={`body-m mt-[24px] ${
                  track === v.value
                    ? 'text-[var(--neutral-rich-gray)]'
                    : 'text-[var(--neutral-light-gray)]'
                }`}
              >
                {v.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
