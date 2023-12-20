import React from 'react';
import { BsArrowRightShort } from 'react-icons/bs';

interface FooterProp {}

const BlogCardFooter: React.FC<FooterProp> = () => {
  return (
    <div className="flex items-center text-[16px] text-[#8C8C8C] leading-[25.6px] tracking-[0.32px]">
      <div className="border-r border-r-[#000] pr-[10px] flex items-center">
        <span className="pr-[5px]">by</span>
        <span className="underline">Peter Parker</span>
        <BsArrowRightShort size={26} />
      </div>
      <div className="border-r border-r-[#000] px-[10px]">Jan 02, 2023</div>
      <div className="pl-[10px]">10 min read</div>
    </div>
  );
};

export default BlogCardFooter;
