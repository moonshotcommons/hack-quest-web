'use client';
import { FC } from 'react';
import { useNeedPCRedirect } from '@/hooks/useNeedPCRedirect';

// export const metadata: Metadata = {
//   title: 'Campaigns'
// };
interface CampaignsPageProps {}

const CampaignsPage: FC<CampaignsPageProps> = (props) => {
  useNeedPCRedirect();
  return (
    <>
      {/* <Campaigns></Campaigns>
      <PageRetentionTime trackName="campaigns-页面留存时间"></PageRetentionTime> */}
    </>
  );
};

export default CampaignsPage;
