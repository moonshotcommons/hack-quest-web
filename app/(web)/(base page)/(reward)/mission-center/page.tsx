import { FC } from 'react';
import MissionCenter from './components';
import { Metadata } from 'next';
import PageRetentionTime from '@/components/Common/PageRetentionTime';

export const metadata: Metadata = {
  title: 'Mission Center'
};

interface MissionCenterPageProps {}

const MissionCenterPage: FC<MissionCenterPageProps> = (props) => {
  return (
    <>
      <MissionCenter />
      <PageRetentionTime trackName="mission-center-页面留存时间"></PageRetentionTime>
    </>
  );
};

export default MissionCenterPage;
