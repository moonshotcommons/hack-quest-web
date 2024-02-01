'use client';
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
import React, { useEffect, useRef, useState } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import Button from '@/components/Common/Button';
import {
  ChangeState,
  ScrollContainer
} from '@/components/Common/ScrollContainer';
import ScrollControl from '../ScrollControl';
import MobBlogCard from '@/components/Mobile/MobBlogCard';
import { useRedirect } from '@/hooks/useRedirect';

interface BlogFooterProp {
  backTop?: VoidFunction;
  type?: 'link' | 'top';
}

const BlogFooter: React.FC<BlogFooterProp> = ({ backTop, type = 'top' }) => {
  const [scrollContainerState, setScrollContainerState] =
    useState<ChangeState>();
  const [featureBlogList, setFeatureBlogList] = useState<BlogType[]>([]);
  const boxRef = useRef<HTMLDivElement>(null);
  const [boxWidth, setBoxWidth] = useState(0);
  const { redirectToUrl } = useRedirect();
  const { loading } = useRequest(async () => {
    const res = await webApi.resourceStationApi.getFeaturedBlog();
    setFeatureBlogList(res?.slice(0, 4) || []);
  });

  const handleClick = () => {
    if (type === 'top') {
      backTop?.();
    } else {
      redirectToUrl(MenuLink.BLOG);
    }
  };
  useEffect(() => {
    setBoxWidth(boxRef.current?.getClientRects()[0].width || 0);
  }, []);
  return (
    <div className="w-full bg-yellow-extra-light px-[1.25rem] py-[1.875rem]">
      <div ref={boxRef}>
        <div className="flex justify-between">
          <div className="flex flex-col gap-[15px]">
            <h2 className="text-h3-mob text-neutral-off-black">
              Featured Blog
            </h2>
          </div>
          <Link
            href={`/mobile/${MenuLink.BLOG}`}
            className="body-s flex items-center gap-x-[7px] text-neutral-black"
            onClick={() => {
              BurialPoint.track('home-view all点击');
            }}
          >
            <span>View All</span>
            <BsArrowRight size={12}></BsArrowRight>
          </Link>
        </div>
        <Loading loading={loading}>
          <ScrollContainer
            onChange={(state: any) => setScrollContainerState(state)}
          >
            <div className="my-[1.875rem] flex overflow-x-hidden">
              {featureBlogList.map((blog) => (
                <div
                  key={blog.id}
                  className="w-[calc(100vw-2.5rem)] p-[.25rem]"
                >
                  <MobBlogCard blog={blog} />
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
            boxWidth={boxWidth}
          ></ScrollControl>
        </Loading>
        <div className="button-text-m flex w-full justify-center pt-[1.875rem]">
          <Button
            className="h-[3rem] w-[13rem] border border-neutral-black text-neutral-black"
            onClick={handleClick}
          >
            {`BACK TO ${type === 'top' ? 'TOP' : 'ALL BLOGS'}`}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BlogFooter;
