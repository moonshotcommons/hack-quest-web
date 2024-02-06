import { FC } from 'react';
import { Metadata } from 'next';
import HackathonIdPage from '../components/HackthonId';

export const metadata: Metadata = {
  title: 'Hackathon Detail'
};

interface HackathonIdProps {}

const HackathonId: FC<HackathonIdProps> = (props) => {
  return (
    <>
      <HackathonIdPage />
    </>
  );
};

export default HackathonId;
