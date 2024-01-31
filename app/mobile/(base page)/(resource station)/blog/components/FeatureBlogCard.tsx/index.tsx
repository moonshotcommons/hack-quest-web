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
      className="w-full h-[425px] flex bg-[#fff] overflow-hidden rounded-[10px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] cursor-pointer"
      onClick={goBlogContent}
      href={`${MenuLink.BLOG}/${blog.id}`}
    >
      <div className="w-[756px] h-full relative  overflow-hidden">
        <Image
          src={blog.image}
          fill
          alt="blogImage"
          className="object-cover"
        ></Image>
      </div>
      <div className="flex-1 min-w-[604px] h-full flex flex-col justify-between p-[30px]">
        <div className="flex flex-col gap-[20px] ">
          <div className="flex gap-[10px]">
            {blog.categories.map((v, i) => (
              <TrackTag
                key={i}
                track={v}
                className="px-[16px] py-[6px] caption-16pt"
              />
            ))}
          </div>
          <div className="text-[28px] font-next-book-bold leading-[45px] tracking-[0.56px] line-clamp-2">
            {blog.title}
          </div>
          <div className="body-l text-neutral-black line-clamp-5">
            {blog.description}
          </div>
        </div>
        <BlogCardFooter
          blog={blog}
          className="body-m text-neutral-medium-gray "
          borderColor="border-r-[#8c8c8c]"
        />
      </div>
    </Link>
  );
};

export default FeatureBlogCard;
