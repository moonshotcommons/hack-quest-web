import { Metadata } from 'next';
import LearninTrack from './components';

interface SearchParamsType {
  searchParams: {
    track: string;
    language: string;
  };
}

export async function generateMetadata({ searchParams }: SearchParamsType): Promise<Metadata> {
  const metadata: Metadata = {
    title: 'HackQuest Learning Track',
    alternates: {
      canonical: `https://www.hackquest.io/learning-track?${new URLSearchParams(searchParams).toString()}`
    }
  };

  return metadata;
}

export default LearninTrack;
