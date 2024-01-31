'use client';
import BlogCard from '@/components/Web/Business/BlogCard';
import Loading from '@/components/Common/Loading';
import {
  ChangeState,
  ScrollContainer,
  ScrollControl
} from '@/components/Common/ScrollContainer';
import { MenuLink } from '@/components/Web/Layout/BasePage/Navbar/type';
import { BurialPoint } from '@/helper/burialPoint';
import webApi from '@/service';
import { BlogType } from '@/service/webApi/resourceStation/type';
import { useRequest } from 'ahooks';
import Link from 'next/link';
import React, { useState } from 'react';
import { LuChevronRight } from 'react-icons/lu';

interface BlogFooterProp {}

const BlogFooter: React.FC<BlogFooterProp> = () => {
  const [scrollContainerState, setScrollContainerState] =
    useState<ChangeState>();
  const [featureBlogList, setFeatureBlogList] = useState<BlogType[]>([]);
  const { loading } = useRequest(async () => {
    const res = await webApi.resourceStationApi.getFeaturedBlog();
    setFeatureBlogList(res);
  });
  return (
    <div className="w-full bg-[#FFF4CE] py-[60px]">
      <div className="container mx-auto">
        <div className="flex justify-between">
          <div className="flex flex-col gap-[15px]">
            <h2 className="font-next-poster-Bold text-[28px] tracking-[1.68px] text-neutral-black">
              Featured Blog
            </h2>
          </div>
          <Link
            href={MenuLink.BLOG}
            className="flex gap-x-[15px] items-center text-neutral-black hover:opacity-70 font-next-book tracking-[0.36px] text-[18px]"
            onClick={() => {
              BurialPoint.track('home-view all点击');
            }}
          >
            <span>View All</span>
            <LuChevronRight size={32}></LuChevronRight>
          </Link>
        </div>
        <Loading loading={loading}>
          <ScrollContainer
            onChange={(state: any) => setScrollContainerState(state)}
          >
            <div className="my-[30px] flex gap-[20px] overflow-x-hidden">
              {featureBlogList.map((blog) => (
                <div key={blog.id} className="w-[440px] p-[4px]">
                  <BlogCard blog={blog} />
                </div>
              ))}
            </div>
          </ScrollContainer>
          <ScrollControl
            changeState={scrollContainerState}
            burialPointType={[
              'blog-content-page-featured blogCard滚动-左',
              'blog-content-page-featured blogCard滚动-右'
            ]}
          ></ScrollControl>
        </Loading>
      </div>
    </div>
  );
};

export default BlogFooter;
