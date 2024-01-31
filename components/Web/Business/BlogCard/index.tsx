'use client';

import React from 'react';
import Image from 'next/image';
import BlogCardFooter from './BlogCardFooter';
import { BlogType } from '@/service/webApi/resourceStation/type';
import { MenuLink } from '@/components/Web/Layout/BasePage/Navbar/type';
import { BurialPoint } from '@/helper/burialPoint';
import Link from 'next/link';
import TrackTag from '@/components/Common/TrackTag';

interface BlogCardProp {
  blog: BlogType;
  isMobile?: boolean;
}

const BlogCard: React.FC<BlogCardProp> = ({ blog, isMobile }) => {
  const goBlogContent = () => {
    BurialPoint.track('blog blogCard 卡片点击');
  };
  return (
    <Link
      className="card-hover flex w-full flex-col overflow-hidden rounded-[10px] bg-neutral-white text-neutral-off-black"
      onClick={goBlogContent}
      href={`${isMobile ? '/mobile' : ''}${MenuLink.BLOG}/${blog.id}`}
    >
      <div className="relative h-[0] w-full pt-[56%] ">
        <Image
          src={blog.image}
          alt="blogImage"
          fill
          className="object-cover"
        ></Image>
      </div>
      <div className="flex h-[215px] flex-col justify-between p-[16px]">
        <div className="flex flex-col gap-[16px]">
          <div className="flex gap-[10px] overflow-hidden">
            {blog.categories.map((v, i) => (
              <TrackTag key={i} track={v} />
            ))}
          </div>
          <div className="body-m-bold line-clamp-2">{blog.title}</div>
          <div className="body-s line-clamp-2 text-neutral-rich-gray">
            {blog.description}
          </div>
        </div>

        <BlogCardFooter
          blog={blog}
          className="caption-12pt text-neutral-rich-gray "
          borderColor="border-r-[#3e3e3e]"
          iconSize={18}
        />
      </div>
    </Link>
  );
};

export default BlogCard;
