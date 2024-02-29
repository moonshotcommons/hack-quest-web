import { FC } from 'react';
import Electives from './components/Electives';
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
      <Electives />
    </>
  );
};

export default ElectivesPage;
