import { Metadata } from 'next';
import Projects from '..';
import { Lang } from '@/i18n/config';
import MenuLink from '@/constants/MenuLink';

export async function generateMetadata(props: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = props.params;

  return {
    title: 'Hackathons Projects | HackQuest',
    alternates: {
      canonical: `https://www.hackquest.io${lang ? `/${lang}` : ''}${MenuLink.PROJECTS}`,
      languages: {
        'x-default': `https://www.hackquest.io/${Lang.EN}${MenuLink.PROJECTS}`,
        en: `https://www.hackquest.io/${Lang.EN}${MenuLink.PROJECTS}`,
        zh: `https://www.hackquest.io/${Lang.ZH}${MenuLink.PROJECTS}`
      }
    }
  };
}

export default Projects;
