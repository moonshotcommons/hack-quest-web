'use client';
import React from 'react';
import BannerImg from '@/public/images/home/learning_track_banner.png';
import { bannerTabList } from '../../constants/data';
import { SearchInfoType } from '../../constants/type';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface BannerProp {
  changeSearchInfo: (val: SearchInfoType) => void;
  searchInfo: SearchInfoType;
}

const Banner: React.FC<BannerProp> = ({ searchInfo, changeSearchInfo }) => {
  const { track } = searchInfo;
  const router = useRouter();
  return (
    <div
      className="h-[400px] pb-[74px] pt-[60px]"
      style={{
        backgroundImage: `url(${BannerImg.src})`,
        backgroundSize: '400px',
        backgroundPosition: 'top right',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'var(--neutral-off-black)'
      }}
    >
      <div className="container mx-auto flex h-full flex-col justify-between">
        <h1 className="text-h2 text-neutral-white">Learning Tracks</h1>
        <div className="flex gap-[40px]">
          {bannerTabList.map((v) => (
            <div
              key={v.value}
              onClick={() =>
                changeSearchInfo({ ...searchInfo, track: v.value })
              }
              className={`w-[380px] cursor-pointer rounded-[24px] border p-[24px] ${
                track === v.value
                  ? 'border-[var(--neutral-light-gray)] bg-[var(--yellow-primary)]'
                  : 'border-[var(--neutral-off-white)]'
              }`}
            >
              <div
                className={`flex items-center justify-between ${
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
