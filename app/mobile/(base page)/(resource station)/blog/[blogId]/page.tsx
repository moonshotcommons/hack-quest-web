'use client';
import { FC } from 'react';
import { Metadata } from 'next';
import { BlogDetailType } from '@/service/webApi/resourceStation/type';
import { getBlogById } from '@/service/blog';
import { useNeedPCRedirect } from '@/hooks/useNeedPCRedirect';

interface BlogPageProps {
  params: {
    blogId: string;
  };
}

export async function generateMetadata({
  params
}: BlogPageProps): Promise<Metadata> {
  const blog: BlogDetailType = await getBlogById(params.blogId);
  return {
    title: blog.title,
    description: blog.description
  };
}

const BlogPage: FC<BlogPageProps> = async ({ params }) => {
  // const blog: BlogDetailType = await getBlogById(params.blogId);

  useNeedPCRedirect();

  return <>{/* <BlogDetail blog={blog} /> */}</>;
};

export default BlogPage;
