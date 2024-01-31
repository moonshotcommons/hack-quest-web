'use client';
import { cn } from '@/helper/utils';
import { BlogType } from '@/service/webApi/resourceStation/type';
import moment from 'moment';
import React from 'react';
import { BsArrowRightShort } from 'react-icons/bs';
interface FooterProp {
  className?: string;
  borderColor?: string;
  blog: BlogType;
  iconSize?: number;
}

const BlogCardFooter: React.FC<FooterProp> = ({
  className = 'text-[16px] text-[#8C8C8C] leading-[25.6px] tracking-[0.32px]',
  borderColor,
  blog,
  iconSize = 26
}) => {
  if (!blog?.id) return null;
  return (
    <div className={cn('flex items-center  w-full', className)}>
      <div
        className={cn(
          'border-r border-r-[#000] pr-[10px] flex items-center max-w-[42.5%]',
          borderColor
        )}
      >
        <div className="pr-[5px]">By</div>
        <div
          className="overflow-hidden whitespace-nowrap text-ellipsis flex-1"
          title={blog?.creatorName}
        >
          {blog?.creatorName}
        </div>

        <BsArrowRightShort size={iconSize} />
      </div>
      <div className={cn('border-r border-r-[#000] px-[10px]', borderColor)}>
        {moment(blog?.publishDate).format('ll')}
      </div>
      <div className="pl-[10px]">{blog?.duration} min read</div>
    </div>
  );
};

export default BlogCardFooter;
