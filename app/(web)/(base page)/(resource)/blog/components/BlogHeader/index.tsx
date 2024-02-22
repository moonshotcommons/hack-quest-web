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
                <TrackTag
                  key={i}
                  track={v}
                  className="caption-16pt border-neutral-white px-[16px] py-[6px] text-neutral-white"
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
              className="text-neutral-light-gray"
              borderColor="border-neutral-light-gray"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogHeader;
