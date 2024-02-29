import { FC } from 'react';
import MobElectives from './components';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Electives',
  alternates: {
    canonical: 'https://www.hackquest.io/electives'
  }
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
