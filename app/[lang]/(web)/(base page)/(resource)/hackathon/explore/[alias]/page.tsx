import { FC } from 'react';
import { Metadata } from 'next';
import { getHackathonById, getHackathonDetailById } from '@/service/cach/resource/hackathon';
import MenuLink from '@/constants/MenuLink';
import { Lang } from '@/i18n/config';
import { isUuid } from '@/helper/utils';
import { permanentRedirect } from 'next/navigation';
import HackathonDetail from './components';

interface HackathonIdProps {
  params: {
    alias: string;
    lang: string;
  };
}

export async function generateMetadata({ params }: HackathonIdProps): Promise<Metadata> {
  const hackathon = await getHackathonById(params.alias);
  const { lang } = params;
  return {
    title: hackathon.name,
    alternates: {
      canonical: `https://www.hackquest.io${lang ? `/${lang}` : ''}${MenuLink.EXPLORE_HACKATHON}/${params.alias}`,
      languages: {
        'x-default': `https://www.hackquest.io/${Lang.EN}${MenuLink.EXPLORE_HACKATHON}/${params.alias}`,
        en: `https://www.hackquest.io/${Lang.EN}${MenuLink.EXPLORE_HACKATHON}/${params.alias}`,
        zh: `https://www.hackquest.io/${Lang.ZH}${MenuLink.EXPLORE_HACKATHON}/${params.alias}`
      }
    }
  };
}

const HackathonId: FC<HackathonIdProps> = async function ({ params }: HackathonIdProps) {
  const hackathon = await getHackathonDetailById(params.alias);
  if (isUuid(params.alias)) {
    permanentRedirect(`${MenuLink.EXPLORE_HACKATHON}/${hackathon.alias}`);
  }
  return (
    <>
      <HackathonDetail hackathon={hackathon} />
    </>
  );
};

export default HackathonId;
