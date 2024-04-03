import { Metadata } from 'next';
import LearningTrack from './components';

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
      canonical: `https://www.hackquest.io${lang ? `/${lang}` : ''}/learning-track${query}`
    }
  };

  return metadata;
}

export default LearningTrack;
