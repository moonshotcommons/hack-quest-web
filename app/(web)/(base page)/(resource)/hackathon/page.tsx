import { FC } from 'react';
import { Metadata } from 'next';
import HackathonPage from './components';

export const metadata: Metadata = {
  title: 'Hackathons'
};

interface HackathonProps {}

const Hackathon: FC<HackathonProps> = (props) => {
  return (
    <>
      <HackathonPage />
    </>
  );
};

export default Hackathon;
