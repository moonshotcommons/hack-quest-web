import { FC } from 'react';
import HackathonPage from './components';
import { getFeaturedProjects } from '@/service/cach/resource/hackathon';
import { HackathonStatusType } from '@/service/webApi/resourceStation/type';

interface HackathonProps {
  params: { slug: string[] };
  searchParams: { curTab?: HackathonStatusType };
}

const Hackathon: FC<HackathonProps> = async ({ searchParams = {}, params: { slug = [] } }) => {
  // load featured projects
  const featured = await getFeaturedProjects();
  const minPage = Number(slug[1]) < 1 ? 1 : Number(slug[1]);
  const page = slug[0] === 'p' ? minPage : 1;
  const f = featured.length > 30 ? featured.slice(0, 30) : featured;
  return (
    <>
      <HackathonPage featured={f} page={page} curTab={searchParams.curTab || HackathonStatusType.ON_GOING} />
    </>
  );
};

export default Hackathon;
