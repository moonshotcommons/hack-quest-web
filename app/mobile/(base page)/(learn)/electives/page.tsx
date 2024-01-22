import { FC } from 'react';
import MobElectives from './components';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Electives'
};

interface ElectivesPageProps {}

const ElectivesPage: FC<ElectivesPageProps> = (props) => {
  return (
    <>
      <MobElectives />
    </>
  );
};

export default ElectivesPage;
