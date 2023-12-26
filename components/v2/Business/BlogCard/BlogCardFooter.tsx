'use client';
import { cn } from '@/helper/utils';
import React from 'react';
import { BsArrowRightShort } from 'react-icons/bs';

interface FooterProp {
  className?: string;
  borderColor?: string;
}

const BlogCardFooter: React.FC<FooterProp> = ({ className, borderColor }) => {
  return (
    <div
      className={cn(
        'flex items-center text-[16px] text-[#8C8C8C] leading-[25.6px] tracking-[0.32px]',
        className
      )}
    >
      <div
        className={cn(
          'border-r border-r-[#000] pr-[10px] flex items-center',
          borderColor
        )}
      >
        <span className="pr-[5px]">by</span>
        <span className="underline">Peter Parker</span>
        <BsArrowRightShort size={26} />
      </div>
      <div className={cn('border-r border-r-[#000] px-[10px]', borderColor)}>
        Jan 02, 2023
      </div>
      <div className="pl-[10px]">10 min read</div>
    </div>
  );
};

export default BlogCardFooter;
