import { FC } from 'react';
import Blog from './components/Blog';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HackQuest Blog'
};

interface BlogPageProps {}

const BlogPage: FC<BlogPageProps> = (props) => {
  return (
    <>
      <Blog />
    </>
  );
};

export default BlogPage;
