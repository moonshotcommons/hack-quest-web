'use client';
import React, { useRef } from 'react';
import BlogHeader from '../BlogHeader';
import BlogContent from '../BlogContent';
import BlogFooter from '../BlogFooter';
import {
  BlogDetailType,
  ResourceFrom
} from '@/service/webApi/resourceStation/type';
import PageRetentionTime from '@/components/Common/PageRetentionTime';
import BlogLink from '../BlogLink';

interface BlogDetailProp {
  blog: BlogDetailType;
  from?: ResourceFrom;
}

const BlogDetail: React.FC<BlogDetailProp> = ({
  blog,
  from = ResourceFrom.BLOG
}) => {
  const boxRef = useRef<HTMLDivElement>(null);

  const backTop = () => {
    boxRef.current?.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  return (
    <div className="body-m h-full overflow-auto" ref={boxRef}>
      <BlogHeader blog={blog} />
      <BlogContent blog={blog} />
      <BlogLink />
      <BlogFooter backTop={backTop} from={from} />
      <PageRetentionTime trackName="blog-content-page-页面留存时间"></PageRetentionTime>
    </div>
  );
};

export default BlogDetail;
