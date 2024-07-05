import { Metadata } from 'next';
import Explore from '..';
import { Lang } from '@/i18n/config';
import MenuLink from '@/constants/MenuLink';

export const dynamic = 'force-dynamic';

export async function generateMetadata(props: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = props.params;

  return {
    title: 'HackQuest',
    alternates: {
      canonical: `https://www.hackquest.io${lang ? `/${lang}` : ''}${MenuLink.EXPLORE_HACKATHON}`,
      languages: {
        'x-default': `https://www.hackquest.io/${Lang.EN}${MenuLink.EXPLORE_HACKATHON}`,
        en: `https://www.hackquest.io/${Lang.EN}${MenuLink.EXPLORE_HACKATHON}`,
        zh: `https://www.hackquest.io/${Lang.ZH}${MenuLink.EXPLORE_HACKATHON}`
      }
    }
  };
}

export default Explore;
