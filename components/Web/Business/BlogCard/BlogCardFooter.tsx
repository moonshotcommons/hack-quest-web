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
  className = 'body-m text-neutral-medium-gray',
  borderColor,
  blog,
  iconSize = 26
}) => {
  if (!blog?.id) return null;
  return (
    <div className={cn('flex w-full items-center', className)}>
      <div
        className={cn(
          'flex max-w-[42.5%] items-center border-r border-r-[#000] pr-[10px]',
          borderColor
        )}
      >
        <div className="pr-[5px]">By</div>
        <div
          className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap underline"
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
