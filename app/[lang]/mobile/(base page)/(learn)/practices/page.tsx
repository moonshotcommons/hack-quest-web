import { FC } from 'react';
import MobPractices from './components';
import { Metadata } from 'next';

export async function generateMetadata(props: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = props.params;

  return {
    title: 'HackQuest Projects',
    alternates: {
      canonical: `https://www.hackquest.io${lang ? `/${lang}` : ''}/practices`
    }
  };
}
interface PracticesPageProps {}

const PracticesPage: FC<PracticesPageProps> = (props) => {
  return (
    <>
      <MobPractices />
    </>
  );
};

export default PracticesPage;
