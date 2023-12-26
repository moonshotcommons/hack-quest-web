'use client';
import BlogCardFooter from '@/components/v2/Business/BlogCard/BlogCardFooter';
import { BurialPoint } from '@/helper/burialPoint';
import { useRouter } from 'next/navigation';
import React from 'react';
import { BsArrowLeft } from 'react-icons/bs';

interface BlogHeaderProp {}

const BlogHeader: React.FC<BlogHeaderProp> = () => {
  const router = useRouter();
  return (
    <div className="bg-[#0b0b0b] text-[#fff] pb-[80px]">
      <div className="container mx-auto flex-col-center">
        <div
          className="flex items-center w-full py-[30px]"
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
            <div className="px-[14px] py-[3px] rounded-[100px] border border-[#fff]">
              News & Announcement
            </div>
            {/* <div className="flex items-center">
              <span className="mr-[10px]">Share</span>
              <CiShare2 size={20} />
            </div> */}
          </div>
          <div className="font-next-book-bold text-[38px] leading-[60px] mt-[5px]">
            Moonshot Mafia #22 | Set the Foundation, HashKey Capital Portfolio
            Demo Day AMA
          </div>
          <div className="mt-[10px]">
            <BlogCardFooter
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
