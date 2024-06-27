import { FC } from 'react';
import { HackathonStatusType } from '@/service/webApi/resourceStation/type';
import { getHackathonsList } from '@/service/cach/resource/hackathon';
import Dashboard from './components/Dashboard';
import { Lang } from '@/i18n/config';

export const dynamic = 'force-dynamic';
interface HackathonProps {
  params: { slug: string[]; lang: Lang };
  searchParams: { curTab?: HackathonStatusType };
}

const Hackathon: FC<HackathonProps> = async ({ searchParams = {}, params: { slug = [], lang } }) => {
  // load featured projects
  const PROJECTS_LIMIT = 12;
  const status = searchParams.curTab || HackathonStatusType.ON_GOING;
  const minPage = Number(slug[1]) < 1 ? 1 : Number(slug[1]);
  const page = slug[0] === 'p' ? minPage : 1;
  const hackListParam =
    searchParams.curTab === HackathonStatusType.PAST
      ? {
          status,
          page,
          limit: PROJECTS_LIMIT
        }
      : { status };

  const hackathon = await getHackathonsList(hackListParam);

  return (
    <>
      <Dashboard curTab={status} hackathons={hackathon.data || []} />;
    </>
  );
};

export default Hackathon;
