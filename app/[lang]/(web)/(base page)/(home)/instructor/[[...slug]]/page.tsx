import { Metadata } from 'next';
import Instructor from '../components';
import { Lang } from '@/i18n/config';

export async function generateMetadata(props: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = props.params;

  return {
    title: 'HackQuest Instructor',
    alternates: {
      canonical: `https://www.hackquest.io${lang ? `/${lang}` : ''}/instructor`,
      languages: {
        'x-default': `https://www.hackquest.io/${Lang.EN}/instructor`,
        en: `https://www.hackquest.io/${Lang.EN}/instructor`,
        zh: `https://www.hackquest.io/${Lang.ZH}/instructor`
      }
    }
  };
}

export default Instructor;
