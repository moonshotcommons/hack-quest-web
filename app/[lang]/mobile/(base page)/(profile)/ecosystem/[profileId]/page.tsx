'use client';

import { FC } from 'react';
import { useNeedPCRedirect } from '@/hooks/useNeedPCRedirect';

// export const metadata: Metadata = {
//   title: 'Ecosystem Profile'
// };

interface MissionCenterPageProps {}

const MissionCenterPage: FC<MissionCenterPageProps> = (props) => {
  useNeedPCRedirect();

  return <>{/* <ProfileId /> */}</>;
};

export default MissionCenterPage;
