import { FC } from 'react';
import { Metadata } from 'next';
import { getHackathonById, getHackathonDetailById } from '@/service/cach/resource/hackathon';
import { Lang } from '@/i18n/config';
import MenuLink from '@/constants/MenuLink';
import { isUuid } from '@/helper/utils';
import { permanentRedirect } from 'next/navigation';
import HackDetail from './components';

interface HackathonIdProps {
  params: {
    alias: string;
    lang: string;
  };
  searchParams: Record<string, string>;
}

export async function generateMetadata({ params, searchParams }: HackathonIdProps): Promise<Metadata> {
  let query = new URLSearchParams(searchParams).toString();
  query = query ? '?' + query : '';
  const hackathon = await getHackathonById(params.alias);

  const { lang } = params;

  return {
    title: hackathon.name,
    alternates: {
      canonical: `https://www.hackquest.io${lang ? `/${lang}` : ''}${MenuLink.EXPLORE_HACKATHON}/${params.alias}${query}`,
      languages: {
        'x-default': `https://www.hackquest.io/${Lang.EN}${MenuLink.EXPLORE_HACKATHON}/${params.alias}${query}`,
        en: `https://www.hackquest.io/${Lang.EN}${MenuLink.EXPLORE_HACKATHON}/${params.alias}${query}`,
        zh: `https://www.hackquest.io/${Lang.ZH}${MenuLink.EXPLORE_HACKATHON}/${params.alias}${query}`
      }
    }
  };
}

const HackathonId: FC<HackathonIdProps> = async function ({ params, searchParams }: HackathonIdProps) {
  const utm = searchParams.utm || '';
  const param = utm
    ? {
        utm
      }
    : {};
  const hackathon = await getHackathonDetailById(params.alias, param);
  if (isUuid(params.alias)) {
    const path = utm
      ? `${MenuLink.EXPLORE_HACKATHON}/${hackathon.alias}?utm=${utm}`
      : `${MenuLink.EXPLORE_HACKATHON}/${hackathon.alias}`;
    permanentRedirect(path);
  }
  return (
    <>
      <HackDetail hackathon={hackathon as any} />
    </>
  );
};

export default HackathonId;
