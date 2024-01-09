'use client';

import React from 'react';
import Image from 'next/image';
import BlogCardFooter from './BlogCardFooter';
import { BlogType } from '@/service/webApi/resourceStation/type';
import { MenuLink } from '@/components/Web/Layout/BasePage/Navbar/type';
import { BurialPoint } from '@/helper/burialPoint';
import Link from 'next/link';

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
      className="w-full font-next-book bg-[#FFF] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_24px_rgba(149,157,165,0.2)] cursor-pointer hover:-translate-y-1 transition-all duration-300 rounded-[10px] overflow-hidden flex flex-col"
      onClick={goBlogContent}
      href={`${isMobile ? '/mobile' : ''}${MenuLink.BLOG}/${blog.id}`}
    >
      <div className="w-full h-[0] pt-[56.1%] relative ">
        <Image
          src={blog.image}
          alt="blogImage"
          fill
          className="object-cover"
        ></Image>
      </div>
      <div className="flex-1 px-[15px] pt-[10px] pb-[20px] flex flex-col gap-[7px]">
        <div className="flex gap-[10px]">
          {blog.categories.map((v, i) => (
            <div
              key={i}
              className="w-fit py-[3px] px-[14px] text-[#3E3E3E] text-[14px] leading-[22.4px] rounded-[100px] border border-[#8C8C8C] bg-[#DADADA]"
            >
              {v}
            </div>
          ))}
        </div>
        <div className="text-[24px] leading-[38.4px] tracking-[0.48px] line-clamp-2 h-[77px]">
          {blog.title}
        </div>
        <div className="text-[14px] leading-[22.4px] tracking-[0.28px] line-clamp-2 h-[45px]">
          {blog.description}
        </div>
        <BlogCardFooter blog={blog} />
      </div>
    </Link>
  );
};

export default BlogCard;
