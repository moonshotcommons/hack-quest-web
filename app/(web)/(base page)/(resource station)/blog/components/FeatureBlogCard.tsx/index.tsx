import BlogCardFooter from '@/components/Web/Business/BlogCard/BlogCardFooter';
import React from 'react';
import Image from 'next/image';
import { BlogType } from '@/service/webApi/resourceStation/type';
import { MenuLink } from '@/components/Web/Layout/BasePage/Navbar/type';
import { BurialPoint } from '@/helper/burialPoint';
import Link from 'next/link';

interface FeatureBlogCardProp {
  blog: BlogType;
}

const FeatureBlogCard: React.FC<FeatureBlogCardProp> = ({ blog }) => {
  const goBlogContent = () => {
    BurialPoint.track('blog featureBlogCard 卡片点击');
  };
  return (
    <Link
      className="w-full font-next-book h-[505px] flex bg-[#fff] overflow-hidden rounded-[10px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] cursor-pointer"
      onClick={goBlogContent}
      href={`${MenuLink.BLOG}/${blog.id}`}
    >
      <div className="w-[900px] h-full relative  overflow-hidden">
        <Image
          src={blog.image}
          fill
          alt="blogImage"
          className="object-cover"
        ></Image>
      </div>
      <div className="flex-1 min-w-[460px] h-full flex flex-col justify-between p-[30px]">
        <div className="flex flex-col gap-[15px] ">
          <div className="flex gap-[10px]">
            {blog.categories.map((v, i) => (
              <div
                key={i}
                className="w-fit py-[3px] px-[14px] text-[#3E3E3E] text-[18px] leading-[29px] rounded-[100px] border border-[var(--neutral-medium-gray)] bg-[#DADADA]"
              >
                {v}
              </div>
            ))}
          </div>
          <div className="text-[28px] leading-[45px] tracking-[0.56px] line-clamp-3">
            {blog.title}
          </div>
          <div className="text-[18px] leading-[28.8px] tracking-[0.36px] line-clamp-6">
            {blog.description}
          </div>
        </div>
        <BlogCardFooter blog={blog} />
      </div>
    </Link>
  );
};

export default FeatureBlogCard;
