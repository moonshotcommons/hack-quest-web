import { FC } from 'react';
import Campaigns from './components/Campaigns';

interface CampaignsPageProps {}

const CampaignsPage: FC<CampaignsPageProps> = (props) => {
  return (
    <>
      <Campaigns></Campaigns>
    </>
  );
};

export default CampaignsPage;
