import { FC } from 'react';
import { Metadata } from 'next';
import HackathonPage from './components';
import { getFeaturedProjects } from '@/service/hackathon';

export const metadata: Metadata = {
  title: 'Hackathons | HackQuest'
};

interface HackathonProps {}

const Hackathon: FC<HackathonProps> = async (props) => {
  // load featured projects
  const featured = await getFeaturedProjects();

  return (
    <>
      <HackathonPage featured={featured} />
    </>
  );
};

export default Hackathon;
