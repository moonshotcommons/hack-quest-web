import * as React from 'react';
import { BackLink } from '@/components/hackathon/back-link';
import { VotingContent } from './components/voting-content';
import { getHackathonVote, getJoinedHackathons } from '@/service/cach/resource/hackathon';
import MenuLink from '@/constants/MenuLink';

export default async function Page({ searchParams: { status = 'ongoing' } }: { searchParams: { status: string } }) {
  const hackathons = await getHackathonVote({ status });
  const { stats } = await getJoinedHackathons();
  return (
    <div className="min-h-[calc(100vh-4rem)] w-full p-5">
      <BackLink href={{ pathname: MenuLink.HACKATHON_DASHBOARD, query: { type: 'voting' } }} />
      <React.Suspense fallback={null}>
        <VotingContent hackathons={hackathons} votes={stats.votes} />
      </React.Suspense>
    </div>
  );
}
