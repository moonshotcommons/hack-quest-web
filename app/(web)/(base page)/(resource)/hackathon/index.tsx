import { FC } from 'react';
import HackathonPage from './components';
import { HackathonStatusType } from '@/service/webApi/resourceStation/type';
import { getFeaturedProjects } from '@/service/catch/resource/hackathon';

export const dynamic = 'force-dynamic';
interface HackathonProps {
  params: { slug: string[] };
  searchParams: { curTab?: HackathonStatusType };
}

const Hackathon: FC<HackathonProps> = async ({
  searchParams = {},
  params: { slug = [] }
}) => {
  // load featured projects
  const featured = await getFeaturedProjects();
  const minPage = Number(slug[1]) < 1 ? 1 : Number(slug[1]);
  const page = slug[0] === 'p' ? minPage : 1;
  return (
    <>
      <HackathonPage
        featured={featured}
        page={page}
        curTab={searchParams.curTab || HackathonStatusType.ON_GOING}
      />
    </>
  );
};

export default Hackathon;
