import React from 'react';
import Ha from '@/public/images/hackathon/hackathon_host.png';
import Image from 'next/image';
import BlogCardFooter from './BlogCardFooter';
interface BlogCardProp {}

const BlogCard: React.FC<BlogCardProp> = () => {
  return (
    <div className="w-full font-next-book h-[470px] bg-[#FFF] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_24px_rgba(149,157,165,0.2)] cursor-pointer hover:-translate-y-1 transition-all duration-300 rounded-[10px] overflow-hidden flex flex-col">
      <div className="w-full h-[0] pt-[51.6%] relative ">
        <Image src={Ha} alt="blogImage" fill className="object-contain"></Image>
      </div>
      <div className="flex-1 px-[15px] pt-[10px] pb-[20px] flex flex-col justify-between">
        <div className="flex gap-[10px]">
          <div className="w-fit py-[3px] px-[14px] text-[#3E3E3E] text-[14px] leading-[22.4px] rounded-[100px] border border-[#8C8C8C] bg-[#DADADA]">
            News & Announcement
          </div>
          <div className="w-fit py-[3px] px-[14px] text-[#3E3E3E] text-[14px] leading-[22.4px] rounded-[100px] border border-[#8C8C8C] bg-[#DADADA]">
            News
          </div>
        </div>
        <div className="text-[24px] leading-[38.4px] tracking-[0.48px] line-clamp-2 h-[77px]">
          How a Post-Merge Ethereum Could Attract Institutional Investment
        </div>
        <div className="text-[14px] leading-[22.4px] tracking-[0.28px] line-clamp-2 h-[45px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed Lorem
          ipsum dolor sit amet, consectetur adipiscing elit, sed Lorem ipsum
          dolor sit amet, consectetur adipiscing elit, sed Lorem ipsum dolor sit
          amet, consectetur adipiscing elit, sed
        </div>
        <BlogCardFooter />
      </div>
    </div>
  );
};

export default BlogCard;
