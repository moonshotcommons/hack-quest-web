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

interface BlogProps {
  params: { slug: string[] };
  searchParams: BlogSearchType;
}

const Blog: React.FC<BlogProps> = async function ({ searchParams = {}, params: { slug = [] } }) {
  const limit = 8;
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
      <div className="px-[1.25rem] py-[3.25rem]">
        {searchParams.keyword ? (
          <div className="body-xl mb-[2.5rem] text-center text-neutral-black">
            {totalList} {totalList > 1 ? 'Results' : 'Result'} for
            <span className="text-neutral-medium-gray">“{searchParams.keyword}”</span>
          </div>
        ) : !searchParams.category ? (
          <FeatureBlog list={featureBlogList} />
        ) : null}
        {blogList.length > 0 ? <BlogList list={blogList} /> : <NoData href="/blog/"></NoData>}

        {totalPage > 1 && (
          <div className="mt-[80px] flex justify-center">
            <Pagination page={page} total={totalPage} urlPrefix="/blog/p/" />
          </div>
        )}
      </div>
      {blogList.length === 0 ? <BlogFooter /> : null}
      <PageRetentionTime trackName="blog-页面留存时间"></PageRetentionTime>
    </div>
  );
};

export default Blog;
