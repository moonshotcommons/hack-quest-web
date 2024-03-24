'use client';
import { FC } from 'react';
import { useNeedPCRedirect } from '@/hooks/router/useNeedPCRedirect';

// export const metadata: Metadata = {
//   title: 'Mission Center'
// };

interface MissionCenterPageProps {}

const MissionCenterPage: FC<MissionCenterPageProps> = (props) => {
  useNeedPCRedirect();
  return (
    <>
      {/* <MissionCenter />
      <PageRetentionTime trackName="mission-center-页面留存时间"></PageRetentionTime> */}
    </>
  );
};

export default MissionCenterPage;
