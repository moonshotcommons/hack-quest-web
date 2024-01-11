import BlogList from './BlogList';
import FeatureBlog from './FeatureBlog';
import Pagination from '@/components/Common/Pagination';
import React from 'react';
import { BlogSearchType } from '@/service/webApi/resourceStation/type';
import webApi from '@/service';
import PageRetentionTime from '@/components/Common/PageRetentionTime';
import BlogBanner from '@/app/mobile/(resource station)/blog/components/BlogBanner';

interface BlogProp {
  params: { slug: string[] };
  searchParams: BlogSearchType;
}

const Blog: React.FC<BlogProp> = async function ({
  searchParams = {},
  params: { slug = [] }
}) {
  const limit = 12;
  const page = slug[0] === 'p' ? Number(slug[1]) : 1;

  const [blogData, featured] = await Promise.all([
    webApi.resourceStationApi.getBlog({
      limit,
      ...searchParams,
      ...(page !== 1 && { page })
    }),
    webApi.resourceStationApi.getFeaturedBlog()
  ]);
  const blogList = blogData.data || [];
  const totalList = blogData.total;
  const totalPage = Math.ceil(blogData.total / limit);
  const featureBlogList = featured || [];

  return (
    <div>
      <BlogBanner />
      <div className="container mx-auto py-[70px]">
        {searchParams.keyword ? (
          <div className="text-[#0b0b0b] text-[24px] font-next-book mb-[40px] text-center">
            {totalList} {totalList > 1 ? 'Results' : 'Result'} for
            <span className="text-[#8c8c8c]">“{searchParams.keyword}”</span>
          </div>
        ) : (
          <FeatureBlog list={featureBlogList} />
        )}

        <BlogList list={blogList} />
        {totalPage > 1 && (
          <div className="flex justify-center mt-[80px]">
            <Pagination page={1} total={totalPage} urlPrefix="/blog/p/" />
          </div>
        )}
      </div>
      <PageRetentionTime trackName="blog-页面留存时间"></PageRetentionTime>
    </div>
  );
};

export default Blog;
