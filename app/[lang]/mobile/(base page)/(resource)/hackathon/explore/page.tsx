import { PageLayout } from '@/components/hackathon/page-layout';
import { getFeaturedProjects, getHackathonsList } from '@/service/cach/resource/hackathon';
import { HackathonStatusType, HackathonType } from '@/service/webApi/resourceStation/type';
import { ExploreContent } from './components/explore-content';

export const dynamic = 'force-dynamic';

export default async function Page({
  params: { slug = [] },
  searchParams
}: {
  params: { slug: string[] };
  searchParams: { curTab?: HackathonStatusType };
}) {
  const status = searchParams.curTab || HackathonStatusType.ON_GOING;
  const minPage = Number(slug[1]) < 1 ? 1 : Number(slug[1]);
  const page = slug[0] === 'p' ? minPage : 1;
  const params =
    searchParams.curTab === 'past'
      ? {
          status,
          page,
          limit: 12
        }
      : {
          status
        };
  const [featured, hackathon] = await Promise.all([getFeaturedProjects(), getHackathonsList(params)]);
  let miniHackathonList: HackathonType[] = [];
  if (status === HackathonStatusType.ON_GOING) {
    miniHackathonList = hackathon.data;
  } else {
    let res = await getHackathonsList({ status: HackathonStatusType.ON_GOING });
    miniHackathonList = res.data;
  }
  return (
    <PageLayout
      title="Explore Hackathons"
      description="Explore ongoing hackathons, uncover past projects, and dive into the world of innovation. Your journey through the realm of creativity begins here! 🚀💡"
    >
      <ExploreContent
        featured={featured}
        hackathonList={hackathon.data}
        miniHackathonList={miniHackathonList}
        page={page}
        curTab={status}
        total={hackathon.total}
        limit={12}
      />
    </PageLayout>
  );
}
