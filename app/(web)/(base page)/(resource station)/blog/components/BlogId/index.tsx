import React from 'react';
import BlogHeader from '../BlogHeader';
import BlogContent from '../BlogContent';
import BlogFooter from '../BlogFooter';
import { BlogDetailType } from '@/service/webApi/resourceStation/type';
import PageRetentionTime from '@/components/Common/PageRetentionTime';

interface BlogDetailProp {
  blog: BlogDetailType;
}

const BlogDetail: React.FC<BlogDetailProp> = ({ blog }) => {
  return (
    <div className="body-m">
      <BlogHeader blog={blog} />
      <BlogContent blog={blog} />
      <BlogFooter />
      <PageRetentionTime trackName="blog-content-page-页面留存时间"></PageRetentionTime>
    </div>
  );
};

export default BlogDetail;
