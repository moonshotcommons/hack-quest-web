'use client';

import React from 'react';
import Image from 'next/image';
import { BlogType, ResourceFrom } from '@/service/webApi/resourceStation/type';
import MenuLink from '@/constants/MenuLink';
import { BurialPoint } from '@/helper/burialPoint';
import Link from 'next/link';
import TrackTag from '@/components/Common/TrackTag';
import BlogCardFooter from '@/components/Web/Business/BlogCard/BlogCardFooter';

interface MobBlogCardProp {
  blog: BlogType;
  from?: ResourceFrom;
}

const MobBlogCard: React.FC<MobBlogCardProp> = ({
  blog,
  from = ResourceFrom.BLOG
}) => {
  const goBlogContent = () => {
    BurialPoint.track(
      `${from === ResourceFrom.BLOG ? 'blog' : 'glossary'} blogCard 卡片点击`
    );
  };
  return (
    <Link
      className="flex h-[8.125rem] w-full overflow-hidden rounded-[.75rem] border border-neutral-light-gray bg-neutral-white text-neutral-off-black"
      onClick={goBlogContent}
      href={`${from === ResourceFrom.BLOG ? MenuLink.BLOG : MenuLink.GLOSSARY}/${blog.alias}`}
    >
      <div className="relative h-full w-[8.125rem] flex-shrink-0">
        <Image
          src={blog.image}
          alt="blogImage"
          fill
          className="object-cover"
        ></Image>
      </div>
      <div className="flex h-full flex-1 flex-shrink-0 flex-col justify-between p-[.75rem]">
        <div className="w-full">
          <div className="flex gap-[.3125rem] overflow-hidden">
            {blog.categories.map((v, i) => (
              <TrackTag key={i} track={v} className="caption-10pt" />
            ))}
          </div>
          <h2 className="body-xs mt-[.5rem] line-clamp-2 text-neutral-off-black">
            {blog.title}
          </h2>
        </div>
        <BlogCardFooter
          blog={blog}
          className="caption-10pt w-full text-neutral-rich-gray"
          borderColor="border-neutral-rich-gray"
          maxWidth="max-w-[33%] wapMin:max-w-[23%]"
          gap={3}
          iconSize={16}
        />
      </div>
    </Link>
  );
};

export default MobBlogCard;
