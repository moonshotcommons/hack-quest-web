'use client';
import Loading from '@/components/Common/Loading';
// import {
//   ChangeState,
//   ScrollContainer,
//   ScrollControl
// } from '@/components/Common/ScrollContainer';
import MenuLink from '@/constants/MenuLink';
import { BurialPoint } from '@/helper/burialPoint';
import webApi from '@/service';
import { BlogType, ResourceFrom } from '@/service/webApi/resourceStation/type';
import { useRequest } from 'ahooks';
import Link from 'next/link';
import React, { useContext, useMemo, useState } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import Button from '@/components/Common/Button';
import { ChangeState, ScrollContainer } from '@/components/Common/ScrollContainer';
import ScrollControl from '../ScrollControl';
import MobBlogCard from '@/components/Mobile/MobBlogCard';
import { useRedirect } from '@/hooks/router/useRedirect';
import MobGlossaryCard from '@/components/Mobile/MobGlossaryCard';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';

interface BlogFooterProp {
  from?: ResourceFrom;
  category?: string[];
}

const BlogFooter: React.FC<BlogFooterProp> = ({ category, from = ResourceFrom.BLOG }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.RESOURCE);
  const [scrollContainerState, setScrollContainerState] = useState<ChangeState>();
  const [featureBlogList, setFeatureBlogList] = useState<BlogType[]>([]);
  const { redirectToUrl } = useRedirect();
  const business = useMemo(() => {
    const path = from === ResourceFrom.BLOG ? MenuLink.BLOG : MenuLink.GLOSSARY;
    const text = from === ResourceFrom.BLOG ? t('backAllBlogs') : t('backAllGlossary');
    return {
      path,
      text
    };
  }, [from]);
  const { loading } = useRequest(async () => {
    const res =
      from === ResourceFrom.BLOG
        ? await webApi.resourceStationApi.getFeaturedBlog({
            category: category?.join(',')
          })
        : await webApi.resourceStationApi.getFeaturedGlossary({
            category: category?.join(',')
          });
    setFeatureBlogList(res);
  });

  const handleClick = () => {
    redirectToUrl(business.path);
  };
  return (
    <div className="w-full bg-yellow-extra-light px-[1.25rem] py-[1.875rem]">
      <div>
        <div className="flex justify-between">
          <div className="flex flex-col gap-[15px]">
            <h2 className="text-h3-mob text-neutral-off-black">
              {from === ResourceFrom.BLOG
                ? `${category ? `${t('moreAboutBlog')} ’${category.join(',')}‘` : t('featuredBlog')}`
                : `${category ? `${t('moreAboutGlossary')} ’${category.join(',')}‘` : t('latestGlossary')}`}
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
              <span>{t('viewAll')}</span>
              <BsArrowRight size={12}></BsArrowRight>
            </Link>
          )}
        </div>
        <Loading loading={loading}>
          <ScrollContainer onChange={(state: any) => setScrollContainerState(state)}>
            <div className="my-[1.875rem] flex overflow-x-hidden">
              {from === ResourceFrom.BLOG
                ? featureBlogList.map((blog) => (
                    <div key={blog.id} className="w-[calc(100vw-2.5rem)] p-[.25rem]">
                      <MobBlogCard blog={blog} from={from} />
                    </div>
                  ))
                : featureBlogList.map((glossary) => (
                    <div key={glossary.id} className="w-[calc(100vw-2.5rem)] p-[.3125rem]">
                      <MobGlossaryCard glossary={glossary} />
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
            {business.text}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BlogFooter;
