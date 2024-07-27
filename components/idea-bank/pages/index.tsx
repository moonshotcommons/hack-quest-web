import { type Metadata } from 'next';
import * as React from 'react';
import MenuLink from '@/constants/MenuLink';
import { getIdeasCached, getTopIdeasCached } from '@/service/cach/ideas';
import { PageLayoutHeader } from './page-layout-header';
import { WebTopRatedIdeas, MobileTopRatedIdeas } from './top-rated-ideas';
import { AllIdeas } from './all-ideas';
import { LIMIT_PER_PAGE } from './constants';

type SearchParams = {
  page?: string;
  keyword?: string;
  sort?: string;
  tracks?: string;
  ecosystemId?: string;
  teamUp?: string;
};

function generateQueryParams(query?: SearchParams, limit = LIMIT_PER_PAGE) {
  const offsetInt = parseInt(query?.page ?? '1');
  const page = Number.isNaN(offsetInt) ? 1 : offsetInt;
  const teamUp = query?.teamUp;
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
    limit
  };
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  return {
    title: 'HackQuest Idea Bank',
    alternates: {
      canonical: `https://www.hackquest.io${lang ? `/${lang}` : ''}${MenuLink.IDEA_BANK}`,
      languages: {
        'x-default': `https://www.hackquest.io/en${MenuLink.IDEA_BANK}`,
        en: `https://www.hackquest.io/en${MenuLink.IDEA_BANK}`,
        zh: `https://www.hackquest.io/zh${MenuLink.IDEA_BANK}`
      }
    }
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
      <React.Suspense fallback={null}>
        <AllIdeas ideas={allIdeas} />
      </React.Suspense>
    </div>
  );
}
