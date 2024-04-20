import { FC } from 'react';
import { Metadata } from 'next';
import HackathonIdPage from '../components/HackthonId';
import { getHackathonById } from '@/service/cach/resource/hackathon';
import MenuLink from '@/constants/MenuLink';
import { Lang } from '@/i18n/config';
import { HackathonType } from '@/service/webApi/resourceStation/type';

interface HackathonIdProps {
  params: {
    hackathonId: string;
    lang: string;
  };
}

export async function generateMetadata({ params }: HackathonIdProps): Promise<Metadata> {
  const hackathon = await getHackathonById(params.hackathonId);
  const { lang } = params;
  return {
    title: hackathon.name,
    description: hackathon.about,
    alternates: {
      canonical: `https://www.hackquest.io${lang ? `/${lang}` : ''}${MenuLink.HACKATHON}/${params.hackathonId}`,
      languages: {
        'x-default': `https://www.hackquest.io/${Lang.EN}${MenuLink.HACKATHON}/${params.hackathonId}`,
        en: `https://www.hackquest.io/${Lang.EN}${MenuLink.HACKATHON}/${params.hackathonId}`,
        zh: `https://www.hackquest.io/${Lang.ZH}${MenuLink.HACKATHON}/${params.hackathonId}`
      }
    }
  };
}

const HackathonId: FC<HackathonIdProps> = async function ({ params }: HackathonIdProps) {
  // const hackathon = await getHackathonById(params.hackathonId);
  const hackathon = { id: '111' } as HackathonType;
  // if (isUuid(params.hackathonId)) {
  //   permanentRedirect(`${MenuLink.HACKATHON}/${hackathon.alias}`);
  // }
  return (
    <>
      <HackathonIdPage hackathon={hackathon} />
    </>
  );
};

export default HackathonId;
