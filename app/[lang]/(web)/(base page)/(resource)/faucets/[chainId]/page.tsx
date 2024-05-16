import { FC } from 'react';
import { Metadata } from 'next';
import MenuLink from '@/constants/MenuLink';
import { Lang } from '@/i18n/config';
import FaucetDetailPage from './components';
import FAQS from '../components/FAQS';
import LandingFooter from '@/components/Web/Business/LandingFooter';
import webApi from '@/service';

interface BlogDetailProp {
  params: {
    chainId: string;
    lang: Lang;
  };
}

export async function generateMetadata({ params }: BlogDetailProp): Promise<Metadata> {
  const { chainId, lang } = params;
  const faucet = await webApi.resourceStationApi.getFaucetDetailById(chainId);

  return {
    title: faucet.name,
    alternates: {
      canonical: `https://www.hackquest.io${lang ? `/${lang}` : ''}${MenuLink.FAUCETS}/${params.chainId}`,
      languages: {
        'x-default': `https://www.hackquest.io/${Lang.EN}${MenuLink.FAUCETS}/${params.chainId}`,
        en: `https://www.hackquest.io/${Lang.EN}${MenuLink.FAUCETS}/${params.chainId}`,
        zh: `https://www.hackquest.io/${Lang.ZH}${MenuLink.FAUCETS}/${params.chainId}`
      }
    }
  };
}

const FaucetDetail: FC<BlogDetailProp> = async ({ params }) => {
  const { lang, chainId } = params;
  const faucet = await webApi.resourceStationApi.getFaucetDetailById(chainId);
  return (
    <>
      <FaucetDetailPage lang={lang} faucet={faucet} />
      <FAQS lang={lang} />
      <LandingFooter lang={lang} />
    </>
  );
};

export default FaucetDetail;
