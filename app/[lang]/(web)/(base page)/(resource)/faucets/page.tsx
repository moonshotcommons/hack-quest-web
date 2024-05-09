import { Metadata } from 'next';
import MenuLink from '@/constants/MenuLink';
import React from 'react';
import { Lang } from '@/i18n/config';
import FaucetsPage from './components';

export interface SearchParamsType {
  track: string;
}
interface FaucetsProp {
  searchParams: {
    track: string;
  };
  params: {
    lang: Lang;
  };
}

export async function generateMetadata({ params, searchParams }: FaucetsProp): Promise<Metadata> {
  const { lang } = params;
  let query = new URLSearchParams(searchParams).toString();
  query = query ? '?' + query : '';

  const metadata: Metadata = {
    title: 'HackQuest Faucets',
    alternates: {
      canonical: `https://www.hackquest.io${lang ? `/${lang}` : ''}${MenuLink.FAUCETS}${query}`,
      languages: {
        'x-default': `https://www.hackquest.io/${Lang.EN}${MenuLink.FAUCETS}${query}`,
        en: `https://www.hackquest.io/${Lang.EN}${MenuLink.FAUCETS}${query}`,
        zh: `https://www.hackquest.io/${Lang.ZH}${MenuLink.FAUCETS}${query}`
      }
    }
  };

  return metadata;
}

const Faucets: React.FC<FaucetsProp> = async ({ params: { lang }, searchParams }) => {
  // const res = await webApi.resourceStationApi.getEvents();
  // const list = res.data || [];
  return <FaucetsPage searchParams={searchParams} lang={lang} list={[]} />;
};

export default Faucets;
