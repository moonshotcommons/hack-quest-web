import { FC } from 'react';
import { Metadata } from 'next';
import ProfileId from '../components/ProfileId';

export const metadata: Metadata = {
  title: 'Ecosystem Profile'
};

interface MissionCenterPageProps {}

const MissionCenterPage: FC<MissionCenterPageProps> = (props) => {
  return (
    <>
      <ProfileId />
    </>
  );
};

export default MissionCenterPage;
