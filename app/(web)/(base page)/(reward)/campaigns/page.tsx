import { FC } from 'react';
import Campaigns from './components';
import { Metadata } from 'next';
import PageRetentionTime from '@/components/Common/PageRetentionTime';

export const metadata: Metadata = {
  title: 'Campaigns'
};
interface CampaignsPageProps {}

const CampaignsPage: FC<CampaignsPageProps> = (props) => {
  return (
    <>
      <Campaigns></Campaigns>
      <PageRetentionTime trackName="campaigns-页面留存时间"></PageRetentionTime>
    </>
  );
};

export default CampaignsPage;
