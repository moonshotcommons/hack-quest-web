import { Metadata } from 'next';
import { Lang } from '@/i18n/config';
import MenuLink from '@/constants/MenuLink';
import webApi from '@/service';
import EcosystemPresentation from './components';
import { permanentRedirect } from 'next/navigation';

interface SearchParamsType {
  searchParams: {
    ecosystemId: string;
  };
  params: {
    lang: Lang;
  };
}

export async function generateMetadata({ params }: SearchParamsType): Promise<Metadata> {
  const { lang } = params;

  const metadata: Metadata = {
    title: 'HackQuest Ecosystem Presentation',
    alternates: {
      canonical: `https://www.hackquest.io${lang ? `/${lang}` : ''}${MenuLink.ECOSYSTEM_PRESENTATION}`,
      languages: {
        'x-default': `https://www.hackquest.io/${Lang.EN}${MenuLink.ECOSYSTEM_PRESENTATION}`,
        en: `https://www.hackquest.io/${Lang.EN}${MenuLink.ECOSYSTEM_PRESENTATION}`,
        zh: `https://www.hackquest.io/${Lang.ZH}${MenuLink.ECOSYSTEM_PRESENTATION}`
      }
    }
  };

  return metadata;
}

const EcosystemPresentationPage: React.FC<SearchParamsType> = async ({ params, searchParams }) => {
  try {
    const ecosystemData = await webApi.ecosystemApi.getEcosystemStatus(searchParams.ecosystemId);
    return <EcosystemPresentation ecosystemId={searchParams.ecosystemId} ecosystemData={ecosystemData} />;
  } catch (error) {
    permanentRedirect(MenuLink.EXPLORE);
  }
};

export default EcosystemPresentationPage;
