'use client';
import BlogCard from '@/components/Web/Business/BlogCard';
import Loading from '@/components/Common/Loading';
// import {
//   ChangeState,
//   ScrollContainer,
//   ScrollControl
// } from '@/components/Common/ScrollContainer';
import { MenuLink } from '@/components/Web/Layout/BasePage/Navbar/type';
import { BurialPoint } from '@/helper/burialPoint';
import webApi from '@/service';
import { BlogType } from '@/service/webApi/resourceStation/type';
import { useRequest } from 'ahooks';
import Link from 'next/link';
import React, { useState } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import Button from '@/components/Common/Button';

interface BlogFooterProp {
  backTop: VoidFunction;
}

const BlogFooter: React.FC<BlogFooterProp> = ({ backTop }) => {
  // const [scrollContainerState, setScrollContainerState] =
  //   useState<ChangeState>();
  const [featureBlogList, setFeatureBlogList] = useState<BlogType[]>([]);
  const { loading } = useRequest(async () => {
    const res = await webApi.resourceStationApi.getFeaturedBlog();
    setFeatureBlogList(res?.slice(0, 4) || []);
  });
  return (
    <div className="w-full bg-yellow-extra-light py-[60px]">
      <div className="container mx-auto">
        <div className="flex justify-between mb-[30px]">
          <div className="flex flex-col gap-[15px]">
            <h2 className="text-h3 text-neutral-off-black">Featured Blog</h2>
          </div>
          <Link
            href={MenuLink.BLOG}
            className="flex gap-x-[7px] items-center text-neutral-black hover:opacity-70 body-m"
            onClick={() => {
              BurialPoint.track('home-view all点击');
            }}
          >
            <span>View All</span>
            <BsArrowRight size={12}></BsArrowRight>
          </Link>
        </div>
        <Loading loading={loading}>
          <div className="flex gap-[20px]">
            {featureBlogList.map((blog) => (
              <div key={blog.id} className="flex-1">
                <BlogCard blog={blog} />
              </div>
            ))}
          </div>
          {/* <ScrollContainer
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
          ></ScrollControl> */}
        </Loading>
        <div className="w-full flex justify-center pt-[60px] button-text-l">
          <Button
            className="w-[270px] h-[60px] border border-neutral-black text-neutral-black"
            onClick={backTop}
          >
            BACK TO TOP
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BlogFooter;
