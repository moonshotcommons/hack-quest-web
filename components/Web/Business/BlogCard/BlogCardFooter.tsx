'use client';
import { cn } from '@/helper/utils';
import { BlogType } from '@/service/webApi/resourceStation/type';
import moment from 'moment';
import React from 'react';
import { BsArrowRightShort } from 'react-icons/bs';
interface FooterProp {
  className?: string;
  maxWidth?: string;
  borderColor?: string;
  blog: BlogType;
  iconSize?: number;
  gap?: number;
}

const BlogCardFooter: React.FC<FooterProp> = ({
  className = 'body-m text-neutral-medium-gray',
  maxWidth,
  borderColor = '#000',
  blog,
  iconSize = 26,
  gap = 10
}) => {
  if (!blog?.id) return null;
  return (
    <div className={cn('flex w-full items-center', className)}>
      <div
        className={cn('flex max-w-[42.5%] items-center', `${maxWidth}`)}
        style={{ paddingRight: `${gap}px` }}
      >
        <div style={{ paddingRight: `${gap}px` }}>By</div>
        <div
          className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap underline"
          title={blog?.creatorName}
        >
          {blog?.creatorName}
        </div>

        <BsArrowRightShort size={iconSize} />
      </div>
      <div
        className={cn('border-l  border-r ', `${borderColor}`)}
        style={{
          padding: `0 ${gap}px`
        }}
      >
        {moment(blog?.publishDate).format('ll')}
      </div>
      <div style={{ paddingLeft: `${gap}px` }}>{blog?.duration} min read</div>
    </div>
  );
};

export default BlogCardFooter;
