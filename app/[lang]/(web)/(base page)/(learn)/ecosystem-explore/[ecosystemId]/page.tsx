import { FC } from 'react';
import { Metadata } from 'next';
import MenuLink from '@/constants/MenuLink';
import { Lang } from '@/i18n/config';
import EcosystemDetail from './components';
import { getEcosystemById } from '@/service/cach/learn/ecosystem';
import { getLevelsCached, getTaskCached } from '@/service/cach/ecosystems';

interface EcosystemIdProps {
  params: {
    ecosystemId: string;
    lang: Lang;
  };
}

export async function generateMetadata({ params }: EcosystemIdProps): Promise<Metadata> {
  const { lang } = params;
  const ecosystem = await getEcosystemById(params.ecosystemId, { lang });
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
  const { lang, ecosystemId } = params;
  const [ecosystem, levels, task] = await Promise.all([
    getEcosystemById(ecosystemId, { lang }),
    getLevelsCached({
      ecosystemId,
      lang
    }),
    getTaskCached({
      ecosystemId,
      fullCourse: true,
      lang
    })
  ]);
  return (
    <>
      <EcosystemDetail lang={lang} levels={levels} ecosystem={ecosystem} task={task} />
    </>
  );
};

export default EcosystemId;
