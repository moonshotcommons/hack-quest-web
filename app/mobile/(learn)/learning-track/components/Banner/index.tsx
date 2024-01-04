import React from 'react';
import BannerImg from '@/public/images/home/learning_track_banner_mobile.png';
import Image from 'next/image';
import { bannerTabList } from '../../constants/data';
import { SearchInfoType } from '../../constants/type';

interface BannerProp {
  changeSearchInfo: (val: SearchInfoType) => void;
  searchInfo: SearchInfoType;
}

const Banner: React.FC<BannerProp> = ({ changeSearchInfo, searchInfo }) => {
  const { track } = searchInfo;
  return (
    <div className="pt-[1.5rem] pb-[5rem] bg-[var(--neutral-off-black)]">
      <div className="relative h-[0] pt-[19.1%]">
        <Image
          src={BannerImg}
          alt="BannerImg"
          className="absolute left-0 top-0 w-full h-full"
        ></Image>
      </div>
      <div className="px-[1.25rem] mt-[1.5rem]">
        <div className="text-h1-mob text-[var(--neutral-white)] mb-[2.5rem]">
          LEARNING TRACKS
        </div>
        <div className="flex gap-[1rem]">
          {bannerTabList.map((v) => (
            <div
              key={v.value}
              onClick={() =>
                changeSearchInfo({ ...searchInfo, track: v.value })
              }
              className={`flex-1 py-[0.75rem] px-[1rem] rounded-[1rem]  border ${
                track === v.value
                  ? 'bg-[var(--yellow-primary)] border-[var(--neutral-light-gray)]'
                  : 'border-[var(--neutral-off-white)]'
              }`}
            >
              <div className="w-[1.5rem] h-[1.5rem] relative">
                <Image
                  src={track === v.value ? v.imgActive : v.img}
                  alt="tab-img"
                  fill
                  className="object-cover"
                ></Image>
              </div>
              <div
                className={`text-h5-mob mt-[0.5rem] ${
                  track === v.value
                    ? 'text-[var(--neutral-off-black)]'
                    : 'text-[var(--neutral-white)]'
                }`}
              >
                {v.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
