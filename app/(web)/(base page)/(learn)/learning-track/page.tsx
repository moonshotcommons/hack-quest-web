import { Metadata } from 'next';
import LearningTrack from './components';

interface SearchParamsType {
  searchParams: {
    track: string;
    language: string;
  };
}

export async function generateMetadata({
  searchParams
}: SearchParamsType): Promise<Metadata> {
  let query = new URLSearchParams(searchParams).toString();
  query = query ? '?' + query : '';
  const metadata: Metadata = {
    title: 'HackQuest Learning Track',
    alternates: {
      canonical: `https://www.hackquest.io/learning-track${query}`
    }
  };

  return metadata;
}

export default LearningTrack;
