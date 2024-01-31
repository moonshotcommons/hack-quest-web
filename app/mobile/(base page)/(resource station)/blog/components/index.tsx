import BlogList from './BlogList';
import FeatureBlog from './FeatureBlog';
import Pagination from '@/components/Common/Pagination';
import React from 'react';
import { BlogSearchType } from '@/service/webApi/resourceStation/type';
import webApi from '@/service';
import PageRetentionTime from '@/components/Common/PageRetentionTime';
import BlogBanner from './BlogBanner';

interface BlogProp {
  params: { slug: string[] };
  searchParams: BlogSearchType;
}

const Blog: React.FC<BlogProp> = async function ({
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
      <BlogBanner />
      <div className="container mx-auto py-[70px]">
        {searchParams.keyword ? (
          <div className="mb-[40px] text-center font-next-book text-[24px] text-neutral-black">
            {totalList} {totalList > 1 ? 'Results' : 'Result'} for
            <span className="text-neutral-medium-gray">
              “{searchParams.keyword}”
            </span>
          </div>
        ) : (
          <FeatureBlog list={featureBlogList} />
        )}

        <BlogList list={blogList} />
        {totalPage > 1 && (
          <div className="mt-[80px] flex justify-center">
            <Pagination page={1} total={totalPage} urlPrefix="/blog/p/" />
          </div>
        )}
      </div>
      <PageRetentionTime trackName="blog-页面留存时间"></PageRetentionTime>
    </div>
  );
};

export default Blog;
