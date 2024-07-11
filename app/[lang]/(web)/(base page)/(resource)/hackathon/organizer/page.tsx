import { FC } from 'react';
import { HackathonStatusType } from '@/service/webApi/resourceStation/type';
import { getHackathonsByCreator } from '@/service/cach/resource/hackathon';
import { Lang } from '@/i18n/config';
import MenuLink from '@/constants/MenuLink';
import { Metadata } from 'next';
import HackathonOrganizer from './components';

interface HackathonOrganizerPageProps {
  params: { lang: Lang };
  searchParams: { curTab?: HackathonStatusType };
}

export async function generateMetadata(props: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = props.params;

  return {
    title: 'Hackathons | HackQuest',
    alternates: {
      canonical: `https://www.hackquest.io${lang ? `/${lang}` : ''}${MenuLink.HACKATHON_ORGANIZER}`,
      languages: {
        'x-default': `https://www.hackquest.io/${Lang.EN}${MenuLink.HACKATHON_ORGANIZER}`,
        en: `https://www.hackquest.io/${Lang.EN}${MenuLink.HACKATHON_ORGANIZER}`,
        zh: `https://www.hackquest.io/${Lang.ZH}${MenuLink.HACKATHON_ORGANIZER}`
      }
    }
  };
}

const HackathonOrganizerPage: FC<HackathonOrganizerPageProps> = async ({ searchParams = {}, params: { lang } }) => {
  // load featured projects
  const status = searchParams.curTab || HackathonStatusType.ON_GOING;
  try {
    const hackathons = await getHackathonsByCreator();
    return <HackathonOrganizer curTab={status} hackathons={hackathons || []} />;
  } catch (error) {
    console.info(error);
  }
};

export default HackathonOrganizerPage;
