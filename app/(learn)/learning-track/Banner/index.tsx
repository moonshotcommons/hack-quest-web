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
  const { tab } = searchInfo;
  return (
    <div
      className="h-[400px] py-[60px] "
      style={{
        backgroundImage: `url(${BannerImg.src})`,
        backgroundSize: '500px',
        backgroundPosition: 'top right',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#131313'
      }}
    >
      <div className="container mx-auto h-full flex flex-col justify-between">
        <div className="text-[54px] text-[#fff] leading-[100%] font-bold">
          LEARNING TRACKS
        </div>
        <div className="flex gap-[40px]">
          {bannerTabList.map((v) => (
            <div
              key={v.value}
              onClick={() => changeSearchInfo({ ...searchInfo, tab: v.value })}
              className={`w-[380px] p-[24px] rounded-[24px] cursor-pointer border ${
                tab === v.value
                  ? 'bg-[#FFE866] border-[#DADADA]'
                  : 'border-[#F4F4F4]'
              }`}
            >
              <div
                className={`flex justify-between items-center ${
                  tab === v.value ? 'text-[#131313]' : 'text-[#fff]'
                }`}
              >
                <span className="text-[28px] font-bold">{v.label}</span>
                <Image
                  src={tab === v.value ? v.imgActive : v.img}
                  alt="tab-img"
                  width={48}
                ></Image>
              </div>
              <div
                className={`text-[16px] leading-[25.6px] mt-[24px] ${
                  tab === v.value ? 'text-[#3E3E3E]' : 'text-[#DADADA]'
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
