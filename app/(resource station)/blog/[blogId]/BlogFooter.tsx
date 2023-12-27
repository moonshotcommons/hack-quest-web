'use client';
import BlogCard from '@/components/v2/Business/BlogCard';
import {
  ChangeState,
  ScrollContainer,
  ScrollControl
} from '@/components/v2/Common/ScrollContainer';
import { MenuLink } from '@/components/v2/Layout/Navbar/type';
import { BurialPoint } from '@/helper/burialPoint';
import Link from 'next/link';
import React, { useState } from 'react';
import { LuChevronRight } from 'react-icons/lu';

interface BlogFooterProp {}

const BlogFooter: React.FC<BlogFooterProp> = () => {
  const [scrollContainerState, setScrollContainerState] =
    useState<ChangeState>();
  return (
    <div className="w-full bg-[#FFF4CE] py-[60px]">
      <div className="container mx-auto">
        <div className="flex justify-between">
          <div className="flex flex-col gap-[15px]">
            <h2 className="font-next-poster-Bold text-[28px] tracking-[1.68px] text-[#000]">
              Featured Blog
            </h2>
          </div>
          <Link
            href={MenuLink.BLOG}
            className="flex gap-x-[15px] items-center text-[#0B0B0B] hover:opacity-70 font-next-book tracking-[0.36px] text-[18px]"
            onClick={() => {
              BurialPoint.track('home-view all点击');
            }}
          >
            <span>View All</span>
            <LuChevronRight size={32}></LuChevronRight>
          </Link>
        </div>
        <div>
          <ScrollContainer
            onChange={(state: any) => setScrollContainerState(state)}
          >
            <div className="my-[30px] flex gap-[20px] overflow-x-hidden">
              {Array.from({ length: 10 }).map((_, index) => {
                return (
                  <div key={index} className="w-[440px] p-[4px]">
                    <BlogCard />
                  </div>
                );
              })}
            </div>
          </ScrollContainer>
          <ScrollControl
            changeState={scrollContainerState}
            burialPointType={[
              'blog-content-page-featured blogCard滚动-左',
              'blog-content-page-featured blogCard滚动-右'
            ]}
          ></ScrollControl>
        </div>
      </div>
    </div>
  );
};

export default BlogFooter;
