import { FC } from 'react';
import Practices from './components/Practices';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Electives'
};

interface PracticesPageProps {}

const PracticesPage: FC<PracticesPageProps> = (props) => {
  return (
    <>
      <Practices />
    </>
  );
};

export default PracticesPage;
