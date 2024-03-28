'use client';

import React from 'react';
import Image from 'next/image';
import BlogCardFooter from './BlogCardFooter';
import { BlogType, ResourceFrom } from '@/service/webApi/resourceStation/type';
import MenuLink from '@/constants/MenuLink';
import { BurialPoint } from '@/helper/burialPoint';
import Link from 'next/link';
import TrackTag from '@/components/Common/TrackTag';

interface BlogCardProp {
  blog: BlogType;
  from?: ResourceFrom;
  isFeatrued?: boolean;
}

const BlogCard: React.FC<BlogCardProp> = ({
  blog,
  from = ResourceFrom.BLOG,
  isFeatrued = false
}) => {
  const goBlogContent = () => {
    BurialPoint.track(
      `${from === ResourceFrom.BLOG ? 'blog' : 'glossary'} blogCard 卡片点击`
    );
  };
  return (
    <Link
      className="card-hover flex w-full flex-col overflow-hidden rounded-[10px] bg-neutral-white text-neutral-off-black"
      onClick={goBlogContent}
      href={`${from === ResourceFrom.BLOG ? MenuLink.BLOG : MenuLink.GLOSSARY}/${blog.alias}`}
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
          <h2 className="body-m-bold line-clamp-2 text-neutral-off-black">
            {blog.title}
          </h2>
          <div className="body-s line-clamp-2 text-neutral-rich-gray">
            {blog.description}
          </div>
        </div>

        <BlogCardFooter
          blog={blog}
          className="caption-12pt text-neutral-rich-gray "
          borderColor="border-neutral-rich-gray "
          gap={isFeatrued ? 4 : 10}
          iconSize={18}
        />
      </div>
    </Link>
  );
};

export default BlogCard;
