import { FC } from 'react';
import Ugc from './components';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Electives'
};

interface UgcPageProps {}

const UgcPage: FC<UgcPageProps> = (props) => {
  return (
    <>
      <Ugc />
    </>
  );
};

export default UgcPage;
