import { FC } from 'react';
import Campaigns from './components';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Campaigns'
};
interface CampaignsPageProps {}

const CampaignsPage: FC<CampaignsPageProps> = (props) => {
  return (
    <>
      <Campaigns></Campaigns>
    </>
  );
};

export default CampaignsPage;
