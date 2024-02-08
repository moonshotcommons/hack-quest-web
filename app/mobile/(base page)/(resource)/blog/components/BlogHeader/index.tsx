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
    <div className="bg-neutral-black px-[1.25rem] pb-[1.875rem] pt-[1.25rem] text-neutral-white">
      <div
        className="mb-[1.875rem] flex w-full cursor-pointer items-center"
        onClick={() => {
          BurialPoint.track('blog-content-page Back按钮点击');
          router.back();
        }}
      >
        <BsArrowLeft size={14} />
        <span className="body-s ml-[10px]">Back</span>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-[10px]">
          {blog.categories?.map((v, i) => (
            <TrackTag
              key={i}
              track={v}
              className="caption-14pt border-neutral-white px-[14px] py-[6px] text-neutral-white"
            />
          ))}
        </div>

        {/* <div className="flex items-center">
              <span className="mr-[10px]">Share</span>
              <CiShare2 size={20} />
            </div> */}
      </div>
      <div className="text-h3-mob my-[.9375rem]">{blog.title}</div>
      <div className="w-full">
        <BlogCardFooter
          blog={blog}
          className="text-[#DADADA]"
          borderColor="border-r-[#DADADA]"
        />
      </div>
    </div>
  );
};

export default BlogHeader;
