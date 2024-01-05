import { FC } from 'react';
import MobPractices from './components';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects'
};

interface PracticesPageProps {}

const PracticesPage: FC<PracticesPageProps> = (props) => {
  return (
    <>
      <MobPractices />
    </>
  );
};

export default PracticesPage;
