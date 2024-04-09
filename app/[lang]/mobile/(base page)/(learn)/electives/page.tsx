import { FC } from 'react';
import MobElectives from './components';
import { Metadata } from 'next';
import { Lang } from '@/i18n/config';

export async function generateMetadata(props: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = props.params;

  return {
    title: 'HackQuest Electives',
    alternates: {
      canonical: `https://www.hackquest.io${lang ? `/${lang}` : ''}/electives`,
      languages: {
        'x-default': `https://www.hackquest.io/${Lang.EN}/electives`,
        en: `https://www.hackquest.io/${Lang.EN}/electives`,
        zh: `https://www.hackquest.io/${Lang.ZH}/electives`
      }
    }
  };
}

interface ElectivesPageProps {}

const ElectivesPage: FC<ElectivesPageProps> = (props) => {
  return (
    <>
      <MobElectives />
    </>
  );
};

export default ElectivesPage;
