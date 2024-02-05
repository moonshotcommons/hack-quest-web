'use client';
import { FC } from 'react';
// import UserProfilePage from './components';
import { useNeedPCRedirect } from '@/hooks/useNeedPCRedirect';

// export const metadata: Metadata = {
//   title: 'User Profile'
// };

interface MissionCenterPageProps {}

const MissionCenterPage: FC<MissionCenterPageProps> = (props) => {
  useNeedPCRedirect();
  return <>{/* <UserProfilePage /> */}</>;
};

export default MissionCenterPage;
