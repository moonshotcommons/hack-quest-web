import { Metadata } from 'next';
import LearningTrack from './components';
import { Lang } from '@/i18n/config';
import MenuLink from '@/constants/MenuLink';

interface SearchParamsType {
  searchParams: {
    track: string;
    language: string;
  };
  params: {
    lang: string;
  };
}

export async function generateMetadata({ searchParams, params }: SearchParamsType): Promise<Metadata> {
  const { lang } = params;
  let query = new URLSearchParams(searchParams).toString();
  query = query ? '?' + query : '';

  const metadata: Metadata = {
    title: 'HackQuest Learning Track',
    alternates: {
      canonical: `https://www.hackquest.io${lang ? `/${lang}` : ''}${MenuLink.LEARNING_TRACK}${query}`,
      languages: {
        'x-default': `https://www.hackquest.io/${Lang.EN}${MenuLink.LEARNING_TRACK}${query}`,
        en: `https://www.hackquest.io/${Lang.EN}${MenuLink.LEARNING_TRACK}${query}`,
        zh: `https://www.hackquest.io/${Lang.ZH}${MenuLink.LEARNING_TRACK}${query}`
      }
    }
  };

  return metadata;
}

export default LearningTrack;
