import BlogCardFooter from '@/components/Web/Business/BlogCard/BlogCardFooter';
import React from 'react';
import Image from 'next/image';
import { BlogType } from '@/service/webApi/resourceStation/type';
import { MenuLink } from '@/components/Web/Layout/BasePage/Navbar/type';
import { BurialPoint } from '@/helper/burialPoint';
import Link from 'next/link';
import TrackTag from '@/components/Common/TrackTag';

interface FeatureBlogCardProp {
  blog: BlogType;
}

const FeatureBlogCard: React.FC<FeatureBlogCardProp> = ({ blog }) => {
  const goBlogContent = () => {
    BurialPoint.track('blog featureBlogCard 卡片点击');
  };
  return (
    <Link
      className="flex h-[425px] w-full cursor-pointer overflow-hidden rounded-[10px] bg-neutral-white shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]"
      onClick={goBlogContent}
      href={`${MenuLink.BLOG}/${blog.alias}`}
    >
      <div className="relative h-full w-[756px]  overflow-hidden">
        <Image src={blog.image} fill alt="blogImage" className="object-cover"></Image>
      </div>
      <div className="flex h-full min-w-[604px] flex-1 flex-col justify-between p-[30px]">
        <div className="flex flex-col gap-[20px] ">
          <div className="flex gap-[10px]">
            {blog.categories.map((v, i) => (
              <TrackTag key={i} track={v} className="caption-16pt px-[16px] py-[6px]" />
            ))}
          </div>
          <div className="text-h3 line-clamp-2">{blog.title}</div>
          <div className="body-l line-clamp-5 text-neutral-black">{blog.description}</div>
        </div>
        <BlogCardFooter blog={blog} className="body-m text-neutral-medium-gray " borderColor="border-neutral-medium-gray" />
      </div>
    </Link>
  );
};

export default FeatureBlogCard;
