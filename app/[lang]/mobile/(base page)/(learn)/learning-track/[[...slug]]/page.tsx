import { Metadata } from 'next';
import LearninTrack from '../components';

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
      canonical: `https://www.hackquest.io${lang ? `/${lang}` : ''}/learning-track${query}`
    }
  };

  return metadata;
}

export default LearninTrack;
