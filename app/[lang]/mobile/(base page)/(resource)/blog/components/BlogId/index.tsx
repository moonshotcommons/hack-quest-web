'use client';
import React, { useRef } from 'react';
import BlogHeader from '../BlogHeader';
import BlogContent from '../BlogContent';
import BlogFooter from '../BlogFooter';
import { BlogDetailType, ResourceFrom } from '@/service/webApi/resourceStation/type';
import PageRetentionTime from '@/components/Common/PageRetentionTime';
import BlogLink from '../BlogLink';

interface BlogDetailProp {
  blog: BlogDetailType;
  from?: ResourceFrom;
}

const BlogDetail: React.FC<BlogDetailProp> = ({ blog, from = ResourceFrom.BLOG }) => {
  const boxRef = useRef<HTMLDivElement>(null);

  return (
    <div className="h-full overflow-auto" ref={boxRef}>
      <BlogHeader blog={blog} from={from} />
      <BlogContent blog={blog} />
      <BlogLink />
      <BlogFooter category={blog.categories} from={from} />
      <PageRetentionTime
        trackName={`${from === ResourceFrom.BLOG ? 'blog' : 'glossary'}-content-page-页面留存时间`}
      ></PageRetentionTime>
    </div>
  );
};

export default BlogDetail;
