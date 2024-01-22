import { FC } from 'react';
import MissionCenter from './components';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mission Center'
};

interface MissionCenterPageProps {}

const MissionCenterPage: FC<MissionCenterPageProps> = (props) => {
  return (
    <>
      <MissionCenter />
    </>
  );
};

export default MissionCenterPage;
