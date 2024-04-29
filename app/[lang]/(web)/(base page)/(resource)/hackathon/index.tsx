import { FC } from 'react';
import HackathonPage from './components';
import { HackathonStatusType, HackathonType } from '@/service/webApi/resourceStation/type';
import { getFeaturedProjects, getHackathonsList } from '@/service/cach/resource/hackathon';

export const dynamic = 'force-dynamic';
interface HackathonProps {
  params: { slug: string[] };
  searchParams: { curTab?: HackathonStatusType };
}

const Hackathon: FC<HackathonProps> = async ({ searchParams = {}, params: { slug = [] } }) => {
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

  const [featured, hackathon] = await Promise.all([getFeaturedProjects(), getHackathonsList(hackListParam)]);
  let miniHackathonList: HackathonType[] = [];
  if (status === HackathonStatusType.ON_GOING) {
    miniHackathonList = hackathon.data;
  } else {
    let res = await getHackathonsList({ status: HackathonStatusType.ON_GOING });
    miniHackathonList = res.data;
  }

  return (
    <>
      <HackathonPage
        featured={featured}
        hackathonList={hackathon.data}
        miniHackathonList={miniHackathonList}
        page={page}
        curTab={status}
        total={hackathon.total}
        limit={PROJECTS_LIMIT}
      />
    </>
  );
};

export default Hackathon;
