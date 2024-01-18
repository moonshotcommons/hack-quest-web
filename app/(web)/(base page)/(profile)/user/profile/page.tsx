import { FC } from 'react';
import { Metadata } from 'next';
import UserProfilePage from './components';

export const metadata: Metadata = {
  title: 'User Profile'
};

interface MissionCenterPageProps {}

const MissionCenterPage: FC<MissionCenterPageProps> = (props) => {
  return (
    <>
      <UserProfilePage />
    </>
  );
};

export default MissionCenterPage;
