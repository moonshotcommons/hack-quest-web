import { FC } from 'react';
import { Metadata } from 'next';
import MenuLink from '@/constants/MenuLink';
import { Lang } from '@/i18n/config';
import FaucetDetailPage from './components';
import FAQS from '../components/FAQS';
import LandingFooter from '@/components/Web/Business/LandingFooter';

interface BlogDetailProp {
  params: {
    faucetId: string;
    lang: Lang;
  };
}

export async function generateMetadata({ params }: BlogDetailProp): Promise<Metadata> {
  // const blog: BlogDetailType = await getBlogById(params.faucetId);
  const { lang } = params;
  return {
    // title: blog.title,
    // description: blog.description,
    alternates: {
      canonical: `https://www.hackquest.io${lang ? `/${lang}` : ''}${MenuLink.FAUCETS}/${params.faucetId}`,
      languages: {
        'x-default': `https://www.hackquest.io/${Lang.EN}${MenuLink.FAUCETS}/${params.faucetId}`,
        en: `https://www.hackquest.io/${Lang.EN}${MenuLink.FAUCETS}/${params.faucetId}`,
        zh: `https://www.hackquest.io/${Lang.ZH}${MenuLink.FAUCETS}/${params.faucetId}`
      }
    }
  };
}

const FaucetDetail: FC<BlogDetailProp> = async ({ params }) => {
  const { lang, faucetId } = params;
  // const blog: BlogDetailType = await getBlogById(params.blogId);
  return (
    <>
      <FaucetDetailPage lang={lang} />
      <FAQS lang={lang} />
      <LandingFooter lang={lang} />
    </>
  );
};

export default FaucetDetail;
