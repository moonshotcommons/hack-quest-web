'use client';
import React, { useRef } from 'react';
import { BlogDetailType, ResourceFrom } from '@/service/webApi/resourceStation/type';
import PageRetentionTime from '@/components/Common/PageRetentionTime';
import GlossaryFooter from '../GlossaryFooter';
import BlogLink from '../../../blog/components/BlogLink';
import BlogContent from '../../../blog/components/BlogContent';
import BlogHeader from '../../../blog/components/BlogHeader';

interface BlogDetailProp {
  blog: BlogDetailType;
  from?: ResourceFrom;
}

const BlogDetail: React.FC<BlogDetailProp> = ({ blog }) => {
  const boxRef = useRef<HTMLDivElement>(null);

  const backTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  return (
    <div className="h-full overflow-auto" ref={boxRef}>
      <BlogHeader blog={blog} />
      <BlogContent blog={blog} />
      <BlogLink />
      <GlossaryFooter backTop={backTop} />
      <PageRetentionTime trackName="glossary-content-page-页面留存时间"></PageRetentionTime>
    </div>
  );
};

export default BlogDetail;
