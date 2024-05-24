import { Metadata } from 'next';
import Explore from './components';
import { Lang } from '@/i18n/config';
import MenuLink from '@/constants/MenuLink';

interface SearchParamsType {
  params: {
    lang: Lang;
  };
}

export async function generateMetadata({ params }: SearchParamsType): Promise<Metadata> {
  const { lang } = params;

  const metadata: Metadata = {
    title: 'HackQuest Explore',
    alternates: {
      canonical: `https://www.hackquest.io${lang ? `/${lang}` : ''}${MenuLink.EXPLORE}`,
      languages: {
        'x-default': `https://www.hackquest.io/${Lang.EN}${MenuLink.EXPLORE}`,
        en: `https://www.hackquest.io/${Lang.EN}${MenuLink.EXPLORE}`,
        zh: `https://www.hackquest.io/${Lang.ZH}${MenuLink.EXPLORE}`
      }
    }
  };

  return metadata;
}

const ExplorePage: React.FC<SearchParamsType> = ({ params }) => {
  const { lang } = params;
  return <Explore lang={lang} />;
};

export default ExplorePage;
