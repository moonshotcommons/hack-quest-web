'use client';
import React, { useEffect } from 'react';
import BlogHeader from './BlogHeader';
import BlogContent from './BlogContent';
import BlogFooter from './BlogFooter';
import { BurialPoint } from '@/helper/burialPoint';

interface BlogDetailProp {}

const BlogDetail: React.FC<BlogDetailProp> = () => {
  useEffect(() => {
    const startTime = new Date().getTime();
    return () => {
      const endTime = new Date().getTime();
      const duration = endTime - startTime;
      BurialPoint.track('blog-content-page-页面留存时间', {
        duration
      });
    };
  }, []);
  return (
    <div className="font-next-book text-[16px]">
      <BlogHeader />
      <BlogContent />
      <BlogFooter />
    </div>
  );
};

export default BlogDetail;
