'use client';
import TrackTag from '@/components/Common/TrackTag';
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
    <div className="bg-neutral-black text-[#fff] pb-[80px]">
      <div className="container mx-auto flex-col-center">
        <div
          className="flex items-center w-full py-[30px] cursor-pointer"
          onClick={() => {
            BurialPoint.track('blog-content-page Back按钮点击');
            router.back();
          }}
        >
          <BsArrowLeft size={26} />
          <span className="text-[18px] ml-[10px]">Back</span>
        </div>
        <div className="w-[808px]">
          <div className="flex justify-between items-center">
            <div className="flex gap-[10px]">
              {blog.categories?.map((v, i) => (
                <TrackTag
                  key={i}
                  track={v}
                  className="px-[16px] py-[6px] caption-16pt border-neutral-white text-neutral-white"
                />
              ))}
            </div>

            {/* <div className="flex items-center">
              <span className="mr-[10px]">Share</span>
              <CiShare2 size={20} />
            </div> */}
          </div>
          <div className="text-h3 mt-[10px]">{blog.title}</div>
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
