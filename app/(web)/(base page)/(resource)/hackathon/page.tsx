import { FC } from 'react';
import { Metadata } from 'next';
import HackathonPage from './components';
import { getFeaturedProjects } from '@/service/hackathon';

export const metadata: Metadata = {
  title: 'Hackathons | HackQuest'
};

export const dynamic = 'force-dynamic';

interface HackathonProps {}

const Hackathon: FC<HackathonProps> = async () => {
  // load featured projects
  const featured = await getFeaturedProjects();

  return (
    <>
      <HackathonPage featured={featured} />
    </>
  );
};

export default Hackathon;
