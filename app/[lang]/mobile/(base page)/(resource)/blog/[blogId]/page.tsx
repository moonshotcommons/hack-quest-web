import { FC } from 'react';
import { Metadata } from 'next';
import BlogDetail from '../components/BlogId';
import { BlogDetailType } from '@/service/webApi/resourceStation/type';
import { getBlogById } from '@/service/cach/resource/blog';

interface BlogDetailProp {
  params: {
    blogId: string;
    lang: string;
  };
}

export async function generateMetadata({ params }: BlogDetailProp): Promise<Metadata> {
  const blog: BlogDetailType = await getBlogById(params.blogId);
  const lang = params.lang;
  return {
    title: blog.title,
    description: blog.description,
    alternates: {
      canonical: `https://www.hackquest.io${lang ? `/${lang}` : ''}/blog/${params.blogId}`
    }
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
