'use client';
import React from 'react';
import BannerImg from '@/public/images/home/learning_track_banner.png';
import { bannerTabList } from '../../constants/data';
import { LearningTrackTab, SearchInfoType } from '../../constants/type';
import Image from 'next/image';
import { getSearchParamsUrl } from '@/helper/utils';
import MenuLink from '@/constants/MenuLink';
import Link from 'next/link';

interface BannerProp {
  searchInfo: SearchInfoType;
}

const Banner: React.FC<BannerProp> = ({ searchInfo }) => {
  const { track } = searchInfo;
  const getSearchInfo = (info: SearchInfoType) => {
    const param = {
      ...info,
      track: info.track === LearningTrackTab.BASIC ? '' : info.track
    };
    return getSearchParamsUrl(param, MenuLink.LEARNING_TRACK);
  };
  return (
    <div
      className="container mx-auto  pb-[80px] pt-[60px]"
      style={{
        backgroundImage: `url(${BannerImg.src})`,
        backgroundSize: 'auto 100%',
        backgroundPosition: 'top right',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="flex h-full flex-col justify-between gap-[60px]">
        <h1 className="text-h2 text-neutral-black">Learning Tracks</h1>
        <div className="flex gap-[40px]">
          {bannerTabList.map((v) => (
            <Link
              key={v.value}
              href={getSearchInfo({ ...searchInfo, track: v.value })}
            >
              <div
                className={`h-[152px] w-[380px] cursor-pointer rounded-[16px] border p-[20px] ${
                  track === v.value
                    ? 'border-transparent bg-yellow-primary'
                    : 'bg-neutral-white hover:border-neutral-medium-gray'
                }`}
              >
                <div
                  className={`flex items-center justify-between ${
                    track === v.value
                      ? 'text-neutral-off-black'
                      : 'text-neutral-black'
                  }`}
                >
                  <span className="body-xl-bold">{v.label}</span>
                  <Image src={v.imgActive} alt="tab-img" width={48}></Image>
                </div>
                <div className={`body-s mt-[20px] text-neutral-rich-gray`}>
                  {v.description}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
