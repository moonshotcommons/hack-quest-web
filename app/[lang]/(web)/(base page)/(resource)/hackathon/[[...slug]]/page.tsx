import { Metadata } from 'next';
import Hackathon from '..';
import { Lang } from '@/i18n/config';
import MenuLink from '@/constants/MenuLink';

export async function generateMetadata(props: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = props.params;

  return {
    title: 'Hackathons | HackQuest',
    alternates: {
      canonical: `https://www.hackquest.io${lang ? `/${lang}` : ''}${MenuLink.HACKATHON}`,
      languages: {
        'x-default': `https://www.hackquest.io/${Lang.EN}${MenuLink.HACKATHON}`,
        en: `https://www.hackquest.io/${Lang.EN}${MenuLink.HACKATHON}`,
        zh: `https://www.hackquest.io/${Lang.ZH}${MenuLink.HACKATHON}`
      }
    }
  };
}

export default Hackathon;
