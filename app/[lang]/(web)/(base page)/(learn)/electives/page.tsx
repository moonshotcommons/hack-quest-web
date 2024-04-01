import { FC } from 'react';
import Electives from './components/Electives';
import { Metadata } from 'next';

export async function generateMetadata(props: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = props.params;

  return {
    title: 'HackQuest Electives',
    alternates: {
      canonical: `https://www.hackquest.io${lang ? `/${lang}` : ''}/electives`
    }
  };
}

interface ElectivesPageProps {}

const ElectivesPage: FC<ElectivesPageProps> = (props) => {
  return (
    <>
      <Electives />
    </>
  );
};

export default ElectivesPage;
