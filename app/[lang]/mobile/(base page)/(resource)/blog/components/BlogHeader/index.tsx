'use client';
import TrackTag from '@/components/Common/TrackTag';
import BlogCardFooter from '@/components/Web/Business/BlogCard/BlogCardFooter';
import MenuLink from '@/constants/MenuLink';
import { BurialPoint } from '@/helper/burialPoint';
import { getSearchParamsUrl } from '@/helper/utils';
import { BlogDetailType, ResourceFrom } from '@/service/webApi/resourceStation/type';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useMemo } from 'react';
import { BsArrowLeft } from 'react-icons/bs';

interface BlogHeaderProp {
  blog: BlogDetailType;
  from?: ResourceFrom;
}

const BlogHeader: React.FC<BlogHeaderProp> = ({ blog, from }) => {
  const router = useRouter();
  const categories = useMemo(() => {
    const path = from === ResourceFrom.BLOG ? MenuLink.BLOG : MenuLink.GLOSSARY;
    const newCategories = blog.categories.map((v) => {
      const url = getSearchParamsUrl(
        {
          category: v
        },
        path
      );
      return {
        label: v,
        url
      };
    });
    return newCategories;
  }, [blog, from]);
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
          {categories?.map((v, i) => (
            <Link key={i} href={v.url}>
              <TrackTag
                key={i}
                track={v.label}
                className="caption-14pt border-[1px] border-neutral-white px-[14px] py-[6px] text-neutral-white"
              />
            </Link>
          ))}
        </div>

        {/* <div className="flex items-center">
              <span className="mr-[10px]">Share</span>
              <CiShare2 size={20} />
            </div> */}
      </div>
      <h1 className="text-h3-mob my-[.9375rem]">{blog.title}</h1>
      <div className="w-full">
        <BlogCardFooter
          blog={blog}
          maxWidth="max-w-[33%] wapMin:max-w-[26%]"
          className="text-neutral-light-gray"
          borderColor="border-neutral-light-gray"
        />
      </div>
    </div>
  );
};

export default BlogHeader;
