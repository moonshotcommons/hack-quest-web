import { Metadata } from 'next';
import Hackathon from '..';
import { Lang } from '@/i18n/config';

export async function generateMetadata(props: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = props.params;

  return {
    title: 'Hackathons | HackQuest',
    alternates: {
      canonical: `https://www.hackquest.io${lang ? `/${lang}` : ''}/hackathon`,
      languages: {
        'x-default': `https://www.hackquest.io/${Lang.EN}/hackathon`,
        en: `https://www.hackquest.io/${Lang.EN}/hackathon`,
        zh: `https://www.hackquest.io/${Lang.ZH}/hackathon`
      }
    }
  };
}

export default Hackathon;
