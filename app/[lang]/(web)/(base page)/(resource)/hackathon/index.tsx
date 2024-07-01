import { FC } from 'react';
import { HackathonStatusType } from '@/service/webApi/resourceStation/type';
import { getHackathonsByCreator, getHackathonsList } from '@/service/cach/resource/hackathon';
import Dashboard from './components/Dashboard';
import { Lang } from '@/i18n/config';
import webApi from '@/service';
import { permanentRedirect } from 'next/navigation';

export const dynamic = 'force-dynamic';
interface HackathonProps {
  params: { lang: Lang };
  searchParams: { curTab?: HackathonStatusType };
}

const Hackathon: FC<HackathonProps> = async ({ searchParams = {}, params: { lang } }) => {
  // load featured projects
  const status = searchParams.curTab || HackathonStatusType.ON_GOING;
  try {
    const hackathons = await getHackathonsByCreator();

    return <Dashboard curTab={status} hackathons={hackathons || []} />;
  } catch (error) {
    // permanentRedirect(`/`);
  }
};

export default Hackathon;
