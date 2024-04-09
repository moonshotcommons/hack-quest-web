import { FC } from 'react';
import { Metadata } from 'next';
import { BlogDetailType, ResourceFrom } from '@/service/webApi/resourceStation/type';
import BlogDetail from '../../blog/components/BlogId';
import { getGlossaryById } from '@/service/cach/resource/blog';
import { isUuid } from '@/helper/utils';
import { permanentRedirect } from 'next/navigation';
import MenuLink from '@/constants/MenuLink';
import { Lang } from '@/i18n/config';

interface BlogDetailProp {
  params: {
    glossaryId: string;
    lang: string;
  };
}

export async function generateMetadata({ params }: BlogDetailProp): Promise<Metadata> {
  const glossary: BlogDetailType = await getGlossaryById(params.glossaryId);
  const { lang } = params;
  return {
    title: glossary.title,
    description: glossary.description,
    alternates: {
      canonical: `https://www.hackquest.io${lang ? `/${lang}` : ''}/glossary/${params.glossaryId}`,
      languages: {
        'x-default': `https://www.hackquest.io/${Lang.EN}/glossary/${params.glossaryId}`,
        en: `https://www.hackquest.io/${Lang.EN}/glossary/${params.glossaryId}`,
        zh: `https://www.hackquest.io/${Lang.ZH}/glossary/${params.glossaryId}`
      }
    }
  };
}

const BlogPage: FC<BlogDetailProp> = async ({ params }) => {
  const glossary: BlogDetailType = await getGlossaryById(params.glossaryId);
  if (isUuid(params.glossaryId)) {
    permanentRedirect(`${MenuLink.GLOSSARY}/${glossary.alias}`);
  }
  return (
    <>
      <BlogDetail blog={glossary} from={ResourceFrom.GLOSSARY} />
    </>
  );
};

export default BlogPage;
