import { FC } from 'react';
import { Metadata } from 'next';
import HackathonIdPage from '../components/HackthonId';
import { getHackathonById } from '@/service/cach/resource/hackathon';
import { Lang } from '@/i18n/config';
import MenuLink from '@/constants/MenuLink';

interface HackathonIdProps {
  params: {
    hackathonId: string;
    lang: string;
  };
  searchParams: Record<string, string>;
}

export async function generateMetadata({ params, searchParams }: HackathonIdProps): Promise<Metadata> {
  let query = new URLSearchParams(searchParams).toString();
  query = query ? '?' + query : '';
  const hackathon = await getHackathonById(params.hackathonId);

  const { lang } = params;

  return {
    title: hackathon.name,
    description: hackathon.about,
    alternates: {
      canonical: `https://www.hackquest.io${lang ? `/${lang}` : ''}/hackathon/${params.hackathonId}${query}`,
      languages: {
        'x-default': `https://www.hackquest.io/${Lang.EN}${MenuLink.HACKATHON}/${params.hackathonId}${query}`,
        en: `https://www.hackquest.io/${Lang.EN}${MenuLink.HACKATHON}/${params.hackathonId}${query}`,
        zh: `https://www.hackquest.io/${Lang.ZH}${MenuLink.HACKATHON}/${params.hackathonId}${query}`
      }
    }
  };
}

const HackathonId: FC<HackathonIdProps> = async function ({ params }: HackathonIdProps) {
  const hackathon = await getHackathonById(params.hackathonId);
  return (
    <>
      <HackathonIdPage hackathon={hackathon} />
    </>
  );
};

export default HackathonId;
