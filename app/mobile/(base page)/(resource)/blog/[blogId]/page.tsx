import { FC } from 'react';
import { Metadata } from 'next';
import BlogDetail from '../components/BlogId';
import { BlogDetailType } from '@/service/webApi/resourceStation/type';
import { getBlogById } from '@/service/catch/resource/blog';

interface BlogDetailProp {
  params: {
    blogId: string;
  };
}

export async function generateMetadata({
  params
}: BlogDetailProp): Promise<Metadata> {
  const blog: BlogDetailType = await getBlogById(params.blogId);
  return {
    title: blog.title,
    description: blog.description
  };
}

const BlogPage: FC<BlogDetailProp> = async ({ params }) => {
  const blog: BlogDetailType = await getBlogById(params.blogId);

  return (
    <>
      <BlogDetail blog={blog} />
    </>
  );
};

export default BlogPage;
