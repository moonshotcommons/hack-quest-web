import { FC } from 'react';
import { HackathonStatus, HackathonStatusType } from '@/service/webApi/resourceStation/type';
import { getHackathonsByCreator } from '@/service/cach/resource/hackathon';
import { Lang } from '@/i18n/config';
import MenuLink from '@/constants/MenuLink';
import { Metadata } from 'next';
import HackathonOrganizer from './components';
import dayjs from 'dayjs';

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

  try {
    const hackathons = await getHackathonsByCreator();
    const draftHackathons = hackathons.filter((item) => item.status === HackathonStatus.DRAFT);
    const onGoingHackathons = hackathons.filter(
      (item) =>
        item.status === HackathonStatus.PUBLISH &&
        dayjs(new Date(item.timeline.rewardTime).toLocaleString()).isAfter(dayjs())
    );

    let status = searchParams.curTab;

    if (!status) {
      status =
        draftHackathons.length && !onGoingHackathons.length ? HackathonStatusType.DRAFT : HackathonStatusType.ON_GOING;
    }

    return <HackathonOrganizer curTab={status} hackathons={hackathons || []} />;
  } catch (error) {
    console.info(error);
  }
};

export default HackathonOrganizerPage;
