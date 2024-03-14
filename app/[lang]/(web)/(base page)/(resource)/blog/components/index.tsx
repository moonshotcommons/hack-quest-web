import BlogBanner from './BlogBanner';
import BlogList from './BlogList';
import FeatureBlog from './FeatureBlog';
import webApi from '@/service';
import React from 'react';
import { BlogSearchType } from '@/service/webApi/resourceStation/type';
import PageRetentionTime from '@/components/Common/PageRetentionTime';
import NoData from './NoData';
import Pagination from '@/components/Common/Pagination';
import BlogFooter from './BlogFooter';
import { MenuLink } from '@/components/Web/Layout/BasePage/Navbar/type';

interface BlogProps {
  params: { slug: string[] };
  searchParams: BlogSearchType;
}

const Blog: React.FC<BlogProps> = async function ({
  searchParams = {},
  params: { slug = [] }
}) {
  const limit = 12;
  const minPage = Number(slug[1]) < 1 ? 1 : Number(slug[1]);
  const page = slug[0] === 'p' ? minPage : 1;

  const [blogData, featured] = await Promise.all([
    webApi.resourceStationApi.getBlog({
      limit,
      ...searchParams,
      page
    }),
    webApi.resourceStationApi.getFeaturedBlog()
  ]);
  const blogList = blogData.data || [];
  const totalList = blogData.total;
  const totalPage = Math.ceil(blogData.total / limit);
  const featureBlogList = featured || [];
  return (
    <div>
      <BlogBanner searchParams={searchParams} />
      <div className="container mx-auto py-[70px]">
        {searchParams.keyword ? (
          <div className="body-xl mb-[40px] text-center text-neutral-black">
            {totalList} Results for
            <span className="pl-[4px] text-neutral-medium-gray">
              “{searchParams.keyword}”
            </span>
          </div>
        ) : !searchParams.category ? (
          <FeatureBlog list={featureBlogList} />
        ) : null}
        {blogList.length > 0 ? (
          <BlogList list={blogList} />
        ) : (
          <NoData href={MenuLink.BLOG}></NoData>
        )}

        {totalPage > 1 && (
          <div className="mt-[80px] flex justify-center">
            <Pagination
              page={page}
              total={totalPage}
              urlPrefix={`${MenuLink.BLOG}/p/`}
            />
          </div>
        )}
      </div>
      {blogList.length === 0 ? <BlogFooter type="link" /> : null}
      <PageRetentionTime trackName="blog-页面留存时间"></PageRetentionTime>
    </div>
  );
};

export default Blog;
