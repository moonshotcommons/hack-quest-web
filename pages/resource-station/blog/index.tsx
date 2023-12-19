import Title from '@/components/Head/Title';
import BlogBanner from '@/components/v2/Blog/BlogBanner';
import React from 'react';

interface BlogProp {}

const Blog: React.FC<BlogProp> = () => {
  return (
    <div>
      <Title title="Blog" />
      <BlogBanner />
    </div>
  );
};

export default Blog;
