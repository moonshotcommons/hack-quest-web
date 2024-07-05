import { FC } from 'react';
import { HackathonStatusType } from '@/service/webApi/resourceStation/type';
import { getHackathonsByCreator } from '@/service/cach/resource/hackathon';
import Dashboard from './components/Dashboard';
import { Lang } from '@/i18n/config';
import MenuLink from '@/constants/MenuLink';
import { Metadata } from 'next';

interface HackathonProps {
  params: { lang: Lang };
  searchParams: { curTab?: HackathonStatusType };
}

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

const Hackathon: FC<HackathonProps> = async ({ searchParams = {}, params: { lang } }) => {
  // load featured projects
  const status = searchParams.curTab || HackathonStatusType.ON_GOING;
  try {
    const hackathons = await getHackathonsByCreator();
    return <Dashboard curTab={status} hackathons={hackathons || []} />;
  } catch (error) {
    console.info(error);
    // permanentRedirect(`/`);
  }
};

export default Hackathon;
