import BlogCardFooter from '@/components/v2/Business/BlogCard/BlogCardFooter';
import React from 'react';
import Ha from '@/public/images/hackathon/hackathon_host.png';
import Image from 'next/image';

interface FeatureBlogCardProp {}

const FeatureBlogCard: React.FC<FeatureBlogCardProp> = () => {
  return (
    <div className="w-full font-next-book h-[505px] bg-[#fff] overflow-hidden rounded-[10px]  flex shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] cursor-pointer">
      <div className="w-[900px] h-full relative  overflow-hidden">
        <Image src={Ha} fill alt="blogImage" className="object-cover"></Image>
      </div>
      <div className="flex-1 min-w-[460px] h-full flex flex-col justify-between p-[30px]">
        <div className="flex flex-col gap-[15px] ">
          <div className="w-fit py-[3px] px-[14px] text-[#3E3E3E] text-[18px] leading-[29px] rounded-[100px] border border-[#8C8C8C] bg-[#DADADA]">
            News & Announcement
          </div>
          <div className="text-[28px] leading-[45px] tracking-[0.56px] line-clamp-3">
            How a Post-Merge Ethereum Could Attract Institutional Investment
          </div>
          <div className="text-[18px] leading-[28.8px] tracking-[0.36px] line-clamp-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed Lorem
            ipsum dolor sit amet, consectetur adipiscing elit, sed Lorem ipsum
            dolor sit amet, consectetur adipiscing elit, sed Lorem ipsum dolor
            sit amet, consectetur adipiscing elit, sed Lorem ipsum dolor sit
            amet, consectetur adipiscing elit, sed Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed
          </div>
        </div>
        <BlogCardFooter />
      </div>
    </div>
  );
};

export default FeatureBlogCard;
