import { Metadata } from 'next';
import LearninTrack from '../components';
import { Lang } from '@/i18n/config';

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
  let query = new URLSearchParams(searchParams).toString();
  query = query ? '?' + query : '';
  const { lang } = params;
  const metadata: Metadata = {
    title: 'HackQuest Learning Track',
    alternates: {
      canonical: `https://www.hackquest.io${lang ? `/${lang}` : ''}/learning-track${query}`,
      languages: {
        'x-default': `https://www.hackquest.io/${Lang.EN}/learning-track${query}`,
        en: `https://www.hackquest.io/${Lang.EN}/learning-track${query}`,
        zh: `https://www.hackquest.io/${Lang.ZH}/learning-track${query}`
      }
    }
  };

  return metadata;
}

export default LearninTrack;
