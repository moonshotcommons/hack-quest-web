'use client';
import React from 'react';
import BannerImg from '@/public/images/home/learning_track_banner_mobile.png';
import Image from 'next/image';
import { bannerTabList } from '../../constants/data';
import { LearningTrackTab, SearchInfoType } from '../../constants/type';
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
    <div className="bg-neutral-off-black pb-[5rem] pt-[1.5rem]">
      <div className="relative h-[0] pt-[19.1%]">
        <Image src={BannerImg} alt="BannerImg" className="absolute left-0 top-0 h-full w-full"></Image>
      </div>
      <div className="mt-[1.5rem] px-[1.25rem]">
        <h1 className="text-h1-mob mb-[2.5rem] text-neutral-white">Learning Tracks</h1>
        <div className="flex gap-[1rem]">
          {bannerTabList.map((v) => (
            <Link
              key={v.value}
              className="flex-1 flex-shrink-0"
              href={getSearchInfo({ ...searchInfo, track: v.value })}
            >
              <div
                className={`w-full rounded-[1rem] border px-[1rem]  py-[0.75rem] ${
                  track === v.value ? 'border-neutral-light-gray bg-yellow-primary ' : 'border-neutral-off-white'
                }`}
              >
                <div className="relative h-[1.5rem] w-[1.5rem]">
                  <Image
                    src={track === v.value ? v.imgActive : v.img}
                    alt="tab-img"
                    fill
                    className="object-cover"
                  ></Image>
                </div>
                <div
                  className={`text-h5-mob mt-[0.5rem] ${track === v.value ? 'text-neutral-off-black' : 'text-neutral-white'}`}
                >
                  {v.label}
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
