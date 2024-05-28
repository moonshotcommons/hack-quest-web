import { FC } from 'react';
import { Metadata } from 'next';
import MenuLink from '@/constants/MenuLink';
import { Lang } from '@/i18n/config';
import EcosystemDetail from './components';
import { getEcosystemById } from '@/service/cach/learn/ecosystem';

interface EcosystemIdProps {
  params: {
    ecosystemId: string;
    lang: Lang;
  };
}

export async function generateMetadata({ params }: EcosystemIdProps): Promise<Metadata> {
  const ecosystem = await getEcosystemById(params.ecosystemId);
  const { lang } = params;
  return {
    title: ecosystem.info.name,
    description: ecosystem.info.description,
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
  const { lang } = params;
  const ecosystem = (await getEcosystemById(params.ecosystemId)) || {};
  return (
    <>
      <EcosystemDetail lang={lang} ecosystem={ecosystem} />
    </>
  );
};

export default EcosystemId;
