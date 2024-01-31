'use client';
import BlogCardFooter from '@/components/Web/Business/BlogCard/BlogCardFooter';
import { BurialPoint } from '@/helper/burialPoint';
import { BlogDetailType } from '@/service/webApi/resourceStation/type';
import { useRouter } from 'next/navigation';
import React from 'react';
import { BsArrowLeft } from 'react-icons/bs';

interface BlogHeaderProp {
  blog: BlogDetailType;
}

const BlogHeader: React.FC<BlogHeaderProp> = ({ blog }) => {
  const router = useRouter();
  return (
    <div className="bg-neutral-black pb-[80px] text-neutral-white">
      <div className="flex-col-center container mx-auto">
        <div
          className="flex w-full cursor-pointer items-center py-[30px]"
          onClick={() => {
            BurialPoint.track('blog-content-page Back按钮点击');
            router.back();
          }}
        >
          <BsArrowLeft size={26} />
          <span className="body-l ml-[10px]">Back</span>
        </div>
        <div className="w-[808px]">
          <div className="flex items-center justify-between">
            <div className="flex gap-[10px]">
              {blog.categories?.map((v, i) => (
                <div
                  key={i}
                  className="rounded-[100px] border border-neutral-white px-[14px] py-[3px]"
                >
                  {v}
                </div>
              ))}
            </div>

            {/* <div className="flex items-center">
              <span className="mr-[10px]">Share</span>
              <CiShare2 size={20} />
            </div> */}
          </div>
          <div className="mt-[5px] font-next-book-bold text-[38px] leading-[60px]">
            {blog.title}
          </div>
          <div className="mt-[10px] w-full">
            <BlogCardFooter
              blog={blog}
              className="text-[#DADADA]"
              borderColor="border-r-[#DADADA]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogHeader;
