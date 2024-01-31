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
      className="flex h-[505px] w-full cursor-pointer overflow-hidden rounded-[10px]  bg-neutral-white font-next-book shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]"
      onClick={goBlogContent}
      href={`/mobile${MenuLink.BLOG}/${blog.id}`}
    >
      <div className="relative h-full w-[900px]  overflow-hidden">
        <Image
          src={blog.image}
          fill
          alt="blogImage"
          className="object-cover"
        ></Image>
      </div>
      <div className="flex h-full min-w-[460px] flex-1 flex-col justify-between p-[30px]">
        <div className="flex flex-col gap-[15px] ">
          <div className="flex gap-[10px]">
            {blog.categories.map((v, i) => (
              <div
                key={i}
                className="body-l w-fit rounded-[100px] border border-[var(--neutral-medium-gray)] bg-[#DADADA] px-[14px] py-[3px] text-neutral-rich-gray"
              >
                {v}
              </div>
            ))}
          </div>
          <div className="text-h3 line-clamp-3">{blog.title}</div>
          <div className="body-l line-clamp-6">{blog.description}</div>
        </div>
        <BlogCardFooter blog={blog} />
      </div>
    </Link>
  );
};

export default FeatureBlogCard;
