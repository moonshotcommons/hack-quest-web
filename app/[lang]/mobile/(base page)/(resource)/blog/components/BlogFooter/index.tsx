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
import { BlogType, ResourceFrom } from '@/service/webApi/resourceStation/type';
import { useRequest } from 'ahooks';
import Link from 'next/link';
import React, { useMemo, useState } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import Button from '@/components/Common/Button';
import { ChangeState, ScrollContainer } from '@/components/Common/ScrollContainer';
import ScrollControl from '../ScrollControl';
import MobBlogCard from '@/components/Mobile/MobBlogCard';
import { useRedirect } from '@/hooks/router/useRedirect';

interface BlogFooterProp {
  backTop?: VoidFunction;
  from?: ResourceFrom;
  type?: 'link' | 'top';
}

const BlogFooter: React.FC<BlogFooterProp> = ({ backTop, type = 'top', from = ResourceFrom.BLOG }) => {
  const [scrollContainerState, setScrollContainerState] = useState<ChangeState>();
  const [featureBlogList, setFeatureBlogList] = useState<BlogType[]>([]);
  const { redirectToUrl } = useRedirect();
  const business = useMemo(() => {
    const path = from === ResourceFrom.BLOG ? MenuLink.BLOG : MenuLink.GLOSSARY;
    const text = from === ResourceFrom.BLOG ? 'ALL BLOGS' : 'ALL GLOSSARY';
    return {
      path,
      text
    };
  }, [from]);
  const { loading } = useRequest(async () => {
    const res =
      from === ResourceFrom.BLOG
        ? await webApi.resourceStationApi.getFeaturedBlog()
        : await webApi.resourceStationApi.getFeaturedGlossary();
    setFeatureBlogList(res);
  });

  const handleClick = () => {
    if (type === 'top') {
      backTop?.();
    } else {
      redirectToUrl(business.path);
    }
  };
  return (
    <div className="w-full bg-yellow-extra-light px-[1.25rem] py-[1.875rem]">
      <div>
        <div className="flex justify-between">
          <div className="flex flex-col gap-[15px]">
            <h2 className="text-h3-mob text-neutral-off-black">
              {from === ResourceFrom.BLOG ? 'Featured Blog' : 'Latest Glossary'}
            </h2>
          </div>
          {from === ResourceFrom.BLOG && (
            <Link
              href={business.path}
              className="body-s flex items-center gap-x-[7px] text-neutral-black"
              onClick={() => {
                BurialPoint.track('home-view all点击');
              }}
            >
              <span>View All</span>
              <BsArrowRight size={12}></BsArrowRight>
            </Link>
          )}
        </div>
        <Loading loading={loading}>
          <ScrollContainer onChange={(state: any) => setScrollContainerState(state)}>
            <div className="my-[1.875rem] flex overflow-x-hidden">
              {featureBlogList.map((blog) => (
                <div key={blog.id} className="w-[calc(100vw-2.5rem)] p-[.25rem]">
                  <MobBlogCard blog={blog} from={from} />
                </div>
              ))}
            </div>
          </ScrollContainer>
          <ScrollControl
            changeState={scrollContainerState}
            burialPointType={[
              `${from === ResourceFrom.BLOG ? 'blog' : 'glossary'}-content-page-featured blogCard滚动-左`,
              `${from === ResourceFrom.BLOG ? 'blog' : 'glossary'}-content-page-featured blogCard滚动-右`
            ]}
          ></ScrollControl>
        </Loading>
        <div className="button-text-m flex w-full justify-center pt-[1.875rem]">
          <Button
            className="h-[3rem] w-[13rem] border border-neutral-black p-0 text-neutral-black"
            onClick={handleClick}
          >
            BACK TO {`${type === 'top' ? 'TOP' : `${business.text}`}`}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BlogFooter;
