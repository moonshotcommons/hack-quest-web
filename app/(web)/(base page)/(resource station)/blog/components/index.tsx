import BlogBanner from './BlogBanner';
import BlogList from './BlogList';
import FeatureBlog from './FeatureBlog';
import webApi from '@/service';
import React from 'react';
import { BlogSearchType } from '@/service/webApi/resourceStation/type';
import PageRetentionTime from '@/components/Common/PageRetentionTime';
import NoData from './NoData';
import Pagination from '@/components/Common/Pagination';

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
          <div className="text-[#0b0b0b] text-[24px] font-next-book mb-[40px] text-center">
            {totalList} Results for
            <span className="text-[#8c8c8c] pl-[4px]">
              “{searchParams.keyword}”
            </span>
          </div>
        ) : (
          <FeatureBlog list={featureBlogList} />
        )}
        {blogList.length > 0 ? (
          <BlogList list={blogList} />
        ) : (
          <NoData href="/blog/"></NoData>
        )}

        {totalPage > 1 && (
          <div className="flex justify-center mt-[80px]">
            <Pagination page={page} total={totalPage} urlPrefix="/blog/p/" />
          </div>
        )}
      </div>
      <PageRetentionTime trackName="blog-页面留存时间"></PageRetentionTime>
    </div>
  );
};

export default Blog;
