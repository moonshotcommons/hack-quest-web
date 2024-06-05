import { getIdeasCached, getTopIdeasCached } from '@/service/cach/ideas';
import { PageLayoutHeader } from './page-layout-header';
import { WebTopRatedIdeas, MobileTopRatedIdeas } from './top-rated-ideas';
import { AllIdeas } from './all-ideas';

type SearchParams = {
  page?: string;
  keyword?: string;
  sort?: string;
  tracks?: string;
  ecosystemId?: string;
  teamUp?: string;
};

function generateQueryParams(query?: SearchParams, limitPerOffset = 12) {
  const teamUp = query?.teamUp ?? 'false';
  const offsetInt = parseInt(query?.page ?? '1');
  const page = Number.isNaN(offsetInt) ? 1 : offsetInt;
  const keyword = query?.keyword;
  const sort = query?.sort;

  const tracks = Array.isArray(query?.tracks) ? query?.tracks?.join(',') : query?.tracks;
  const ecosystemId = Array.isArray(query?.ecosystemId) ? query?.ecosystemId?.join(',') : query?.ecosystemId;

  return {
    page,
    keyword,
    tracks,
    ecosystemId,
    teamUp,
    sort,
    limit: page * limitPerOffset
  };
}

export default async function Page({ searchParams }: { searchParams?: SearchParams }) {
  const queryParams = generateQueryParams(searchParams);

  const topIdeas = await getTopIdeasCached();
  const allIdeas = await getIdeasCached(queryParams);
  return (
    <div className="container mx-auto pt-5 sm:pt-8">
      <PageLayoutHeader />
      <WebTopRatedIdeas ideas={topIdeas} />
      <MobileTopRatedIdeas ideas={topIdeas} />
      <AllIdeas ideas={allIdeas} />
    </div>
  );
}
