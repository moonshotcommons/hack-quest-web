import { FC } from 'react';
import { Metadata } from 'next';
import { BlogDetailType } from '@/service/webApi/resourceStation/type';
import BlogDetail from '../../blog/components/BlogId';
import { getGlossaryById } from '@/service/catch/resource';

interface BlogDetailProp {
  params: {
    glossaryId: string;
  };
}

export async function generateMetadata({
  params
}: BlogDetailProp): Promise<Metadata> {
  const glossary: BlogDetailType = await getGlossaryById(params.glossaryId);
  return {
    title: glossary.title,
    description: glossary.description
  };
}

const BlogPage: FC<BlogDetailProp> = async ({ params }) => {
  const glossary: BlogDetailType = await getGlossaryById(params.glossaryId);

  return (
    <>
      <BlogDetail blog={glossary} />
    </>
  );
};

export default BlogPage;
