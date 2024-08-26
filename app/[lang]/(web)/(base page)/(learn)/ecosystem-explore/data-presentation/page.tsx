import { Metadata } from 'next';
import { Lang } from '@/i18n/config';
import MenuLink from '@/constants/MenuLink';
import webApi from '@/service';

interface SearchParamsType {
  searchParams: {
    ecosystemType: string;
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
      canonical: `https://www.hackquest.io${lang ? `/${lang}` : ''}${MenuLink.ECOSYSTEM_DATA_PRESENTATION}`,
      languages: {
        'x-default': `https://www.hackquest.io/${Lang.EN}${MenuLink.ECOSYSTEM_DATA_PRESENTATION}`,
        en: `https://www.hackquest.io/${Lang.EN}${MenuLink.ECOSYSTEM_DATA_PRESENTATION}`,
        zh: `https://www.hackquest.io/${Lang.ZH}${MenuLink.ECOSYSTEM_DATA_PRESENTATION}`
      }
    }
  };

  return metadata;
}

const ExplorePage: React.FC<SearchParamsType> = async ({ params, searchParams }) => {
  return <div>1111</div>;
};

export default ExplorePage;
