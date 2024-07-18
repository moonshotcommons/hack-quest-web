import { Metadata } from 'next';
import Explore from './components';
import { Lang } from '@/i18n/config';
import MenuLink from '@/constants/MenuLink';
import webApi from '@/service';
import {
  introWeb3MockCourseIdEN,
  introWeb3MockCourseIdZH
} from '@/app/[lang]/(web)/(base page)/(learn)/ecosystem-explore/constants/data';

interface SearchParamsType {
  searchParams: {
    keyword: string;
  };
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

const ExplorePage: React.FC<SearchParamsType> = async ({ params, searchParams }) => {
  const { lang } = params;
  const [ecosystems, course] = await Promise.all([
    webApi.ecosystemApi.getEcosystems({
      lang,
      keyword: searchParams.keyword || ''
    }),
    webApi.learningTrackApi.fetchLearningTrackDetailAndCourses(
      lang === Lang.EN ? introWeb3MockCourseIdEN : introWeb3MockCourseIdZH
    )
  ]);
  return <Explore lang={lang} ecosystems={ecosystems} keyword={searchParams.keyword} course={course as any} />;
};

export default ExplorePage;
