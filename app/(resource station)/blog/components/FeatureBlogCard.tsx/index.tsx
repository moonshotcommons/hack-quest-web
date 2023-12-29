import BlogCardFooter from '@/components/v2/Business/BlogCard/BlogCardFooter';
import React from 'react';
import Image from 'next/image';
import { BlogType } from '@/service/webApi/resourceStation/type';
import { MenuLink } from '@/components/v2/Layout/Navbar/type';
import { useRedirect } from '@/hooks/useRedirect';
import { BurialPoint } from '@/helper/burialPoint';

interface FeatureBlogCardProp {
  blog: BlogType;
}

const FeatureBlogCard: React.FC<FeatureBlogCardProp> = ({ blog }) => {
  const { redirectToUrl } = useRedirect();
  const goBlogContent = () => {
    BurialPoint.track('blog featureBlogCard 卡片点击');
    redirectToUrl(`${MenuLink.BLOG}/${blog.id}`);
  };
  return (
    <div
      className="w-full font-next-book h-[505px] bg-[#fff] overflow-hidden rounded-[10px]  flex shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] cursor-pointer"
      onClick={goBlogContent}
    >
      <div className="w-[900px] h-full relative  overflow-hidden">
        <Image
          src={blog.background}
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
                className="w-fit py-[3px] px-[14px] text-[#3E3E3E] text-[18px] leading-[29px] rounded-[100px] border border-[#8C8C8C] bg-[#DADADA]"
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
    </div>
  );
};

export default FeatureBlogCard;
