import React from 'react';
import Image from 'next/image';
import ElectiveImg from '@/public/images/profile/elective_img.png';
import { Typography } from 'antd';
import ElectiveTag from '../ElectiveTag';
import Button from '@/components/v2/Common/Button';
interface MiniElectiveCardProp {}

const MiniElectiveCard: React.FC<MiniElectiveCardProp> = () => {
  return (
    <div className="cursor-pointer flex h-[336px] bg-[#fff] font-next-book text-[#0b0b0b] rounded-[10px] hover:-translate-y-1 transition-all duration-300 shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_24px_rgba(149,157,165,0.2)]">
      <div className="w-[597px] h-full relative">
        <Image
          src={ElectiveImg}
          fill
          alt="electiveImg"
          className="object-contain"
        ></Image>
      </div>
      <div className="flex-1 flex-shrink-0  flex flex-col justify-between h-full px-[40px] py-[20px]">
        <div>
          <p className="text-[rgba(11,11,11,0.6)] text-[18px]">mini</p>
          <p className="font-next-book-bold text-[21px] leading-[26px]">
            Sui for Game Development
          </p>
        </div>
        <div className="leading-[25px] h-[78px] line-clamp-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut Lorem ipsum dolor sit amet, consectetur
          adipiscing elit, sed do eiusmod tempor incididunt ut labore et Lorem
          ipsum dolor sit amet, consectetur adipiscing elit.
        </div>
        <div>
          <ElectiveTag />
        </div>
        <div className="flex justify-between">
          <Button
            type="primary"
            className="w-[calc((100%-15px)/2)] h-15 text-[18px] text-home-learning-track-view-button-color bg-home-learning-track-view-button-bg px-0"
          >
            Enroll
          </Button>
          <Button className="w-[calc((100%-15px)/2)] h-15 text-[18px] border border-home-learning-track-view-button-border text-home-learning-track-view-button-color px-0">
            View Syllabus
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MiniElectiveCard;
