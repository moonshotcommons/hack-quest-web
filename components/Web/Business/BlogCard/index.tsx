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
      className="w-full bg-[#FFF] text-neutral-off-black rounded-[10px] overflow-hidden flex flex-col card-hover"
      onClick={goBlogContent}
      href={`${isMobile ? '/mobile' : ''}${MenuLink.BLOG}/${blog.id}`}
    >
      <div className="w-full h-[0] pt-[56%] relative ">
        <Image
          src={blog.image}
          alt="blogImage"
          fill
          className="object-cover"
        ></Image>
      </div>
      <div className="h-[215px] p-[16px] flex flex-col justify-between">
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
          className="text-neutral-rich-gray caption-12pt "
          borderColor="border-r-[#3e3e3e]"
          iconSize={18}
        />
      </div>
    </Link>
  );
};

export default BlogCard;
