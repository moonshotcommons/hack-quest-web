import { FC } from 'react';
import BlogDetail from '../components/BlogId';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HackQuest Blog Detail'
};

interface BlogPageProps {}

const BlogPage: FC<BlogPageProps> = (props) => {
  return (
    <>
      <BlogDetail />
    </>
  );
};

export default BlogPage;
