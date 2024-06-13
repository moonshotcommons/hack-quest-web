import { FC } from 'react';
import { Metadata } from 'next';
import MenuLink from '@/constants/MenuLink';
import { Lang } from '@/i18n/config';
import HackathonEdit from './components';

interface HackathonIdProps {
  params: {
    hackathonId: string;
    lang: string;
  };
}

export async function generateMetadata({ params }: HackathonIdProps): Promise<Metadata> {
  const { lang } = params;
  // const hackathon = await getHackathonById(params.hackathonId);
  return {
    // title: hackathon.name,
    alternates: {
      canonical: `https://www.hackquest.io${lang ? `/${lang}` : ''}${MenuLink.HACKATHON_EDIT}/${params.hackathonId}`,
      languages: {
        'x-default': `https://www.hackquest.io/${Lang.EN}${MenuLink.HACKATHON_EDIT}/${params.hackathonId}`,
        en: `https://www.hackquest.io/${Lang.EN}${MenuLink.HACKATHON_EDIT}/${params.hackathonId}`,
        zh: `https://www.hackquest.io/${Lang.ZH}${MenuLink.HACKATHON_EDIT}/${params.hackathonId}`
      }
    }
  };
}

const HackahtonEditPage: FC<HackathonIdProps> = async function ({ params }: HackathonIdProps) {
  // const hackathon = await getHackathonById(params.hackathonId);
  // if (isUuid(params.hackathonId)) {
  //   permanentRedirect(`${MenuLink.HACKATHON}/${hackathon.alias}`);
  // }
  return (
    <>
      <HackathonEdit />
    </>
  );
};

export default HackahtonEditPage;
