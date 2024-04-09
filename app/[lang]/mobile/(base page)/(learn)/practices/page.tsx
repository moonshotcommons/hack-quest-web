import { FC } from 'react';
import MobPractices from './components';
import { Metadata } from 'next';
import { Lang } from '@/i18n/config';

export async function generateMetadata(props: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = props.params;

  return {
    title: 'HackQuest Projects',
    alternates: {
      canonical: `https://www.hackquest.io${lang ? `/${lang}` : ''}/practices`,
      languages: {
        'x-default': `https://www.hackquest.io/${Lang.EN}/practices`,
        en: `https://www.hackquest.io/${Lang.EN}/practices`,
        zh: `https://www.hackquest.io/${Lang.ZH}/practices`
      }
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
