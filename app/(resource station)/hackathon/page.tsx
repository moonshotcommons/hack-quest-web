import { FC } from 'react';
import { Metadata } from 'next';
import HackathonPage from './components';

export const metadata: Metadata = {
  title: 'Hackathon'
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
