'use client';
import TrackTag from '@/components/Common/TrackTag';
import { LangContext } from '@/components/Provider/Lang';
import BlogCardFooter from '@/components/Web/Business/BlogCard/BlogCardFooter';
import MenuLink from '@/constants/MenuLink';
import { BurialPoint } from '@/helper/burialPoint';
import { getSearchParamsUrl } from '@/helper/utils';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { BlogDetailType, ResourceFrom } from '@/service/webApi/resourceStation/type';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useContext, useMemo } from 'react';
import { BsArrowLeft } from 'react-icons/bs';

interface BlogHeaderProp {
  blog: BlogDetailType;
  from?: ResourceFrom;
}

const BlogHeader: React.FC<BlogHeaderProp> = ({ blog, from }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.RESOURCE);
  const router = useRouter();
  const categories = useMemo(() => {
    const path = from === ResourceFrom.BLOG ? MenuLink.BLOG : MenuLink.GLOSSARY;
    const categories = from === ResourceFrom.BLOG ? blog.categories : blog.tracks;
    const newCategories = categories.map((v) => {
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
          <span className="body-l ml-[10px]">{t('back')}</span>
        </div>
        <div className="w-[808px]">
          <div className="flex items-center justify-between">
            <div className="flex gap-[10px]">
              {categories?.map((v, i) => (
                <Link key={i} href={v.url}>
                  <TrackTag
                    track={v.label}
                    className="caption-16pt border-neutral-white px-[16px] py-[6px] text-neutral-white"
                  />
                </Link>
              ))}
            </div>

            {/* <div className="flex items-center">
              <span className="mr-[10px]">Share</span>
              <CiShare2 size={20} />
            </div> */}
          </div>
          <h1 className="text-h3 mt-[10px]">{blog.title}</h1>
          <div className="mt-[10px] w-full">
            <BlogCardFooter blog={blog} className="text-neutral-light-gray" borderColor="border-neutral-light-gray" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogHeader;
