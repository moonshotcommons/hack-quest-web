'use client';

import React from 'react';
import Image from 'next/image';
import { BlogType } from '@/service/webApi/resourceStation/type';
import { MenuLink } from '@/components/Web/Layout/BasePage/Navbar/type';
import { BurialPoint } from '@/helper/burialPoint';
import Link from 'next/link';
import TrackTag from '@/components/Common/TrackTag';
import BlogCardFooter from '@/components/Web/Business/BlogCard/BlogCardFooter';

interface MobBlogCardProp {
  blog: BlogType;
  isMobile?: boolean;
}

const MobBlogCard: React.FC<MobBlogCardProp> = ({ blog, isMobile }) => {
  const goBlogContent = () => {
    BurialPoint.track('blog blogCard 卡片点击');
  };
  return (
    <Link
      className="flex h-[130px] w-full overflow-hidden rounded-[.75rem] border border-neutral-light-gray bg-neutral-white text-neutral-off-black"
      onClick={goBlogContent}
      href={`${isMobile ? '/mobile' : ''}${MenuLink.BLOG}/${blog.id}`}
    >
      <div className="relative h-[7.75rem] w-[8.125rem] flex-shrink-0">
        <Image
          src={blog.image}
          alt="blogImage"
          fill
          className="object-cover"
        ></Image>
      </div>
      <div className="flex h-full flex-col justify-between p-[.75rem]">
        <div>
          <div className="flex gap-[.3125rem] overflow-hidden">
            {blog.categories.map((v, i) => (
              <TrackTag key={i} track={v} />
            ))}
          </div>
          <div className="body-xs mt-[.5rem] line-clamp-2">{blog.title}</div>
        </div>

        <div className="">
          {blog.description ? (
            <div className="caption-12pt line-clamp-2 text-neutral-rich-gray">
              {blog.description}
            </div>
          ) : (
            <BlogCardFooter
              blog={blog}
              className="caption-12pt text-neutral-rich-gray "
              borderColor="border-r-[#3e3e3e] pr-[4px] max-w-[37%]"
              gap={4}
              iconSize={18}
            />
          )}
        </div>
      </div>
    </Link>
  );
};

export default MobBlogCard;
