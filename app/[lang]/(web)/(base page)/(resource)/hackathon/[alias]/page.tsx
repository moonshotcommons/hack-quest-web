import { FC } from 'react';
import { Metadata } from 'next';
import { getHackathonById } from '@/service/cach/resource/hackathon';
import MenuLink from '@/constants/MenuLink';
import { Lang } from '@/i18n/config';
import { redirect } from 'next/navigation';

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
  // try {
  //   const hackathon = await getHackathonDetailById(params.alias);
  //   console.log(hackathon);
  redirect(`${MenuLink.EXPLORE_HACKATHON}/${params.alias}`);
  // } catch (err) {
  //   console.log(err);
  //   permanentRedirect(`/404`);
  // }
};

export default HackathonId;
