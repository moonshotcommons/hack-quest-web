import { FC } from 'react';
import { Metadata } from 'next';
import MenuLink from '@/constants/MenuLink';
import { Lang } from '@/i18n/config';
import EcosystemDetail from './components';

interface EcosystemIdProps {
  params: {
    ecosystemId: string;
    lang: string;
  };
}

export async function generateMetadata({ params }: EcosystemIdProps): Promise<Metadata> {
  // const hackathon = await getHackathonById(params.EcosystemId);
  const { lang } = params;
  return {
    // title: hackathon.name,
    // description: hackathon.about,
    alternates: {
      canonical: `https://www.hackquest.io${lang ? `/${lang}` : ''}${MenuLink.EXPLORE}/${params.ecosystemId}`,
      languages: {
        'x-default': `https://www.hackquest.io/${Lang.EN}${MenuLink.EXPLORE}/${params.ecosystemId}`,
        en: `https://www.hackquest.io/${Lang.EN}${MenuLink.EXPLORE}/${params.ecosystemId}`,
        zh: `https://www.hackquest.io/${Lang.ZH}${MenuLink.EXPLORE}/${params.ecosystemId}`
      }
    }
  };
}

const EcosystemId: FC<EcosystemIdProps> = async function ({ params }: EcosystemIdProps) {
  return (
    <>
      <EcosystemDetail />
    </>
  );
};

export default EcosystemId;
