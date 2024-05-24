import * as React from 'react';
import { BackLink } from '@/components/hackathon/back-link';
import { VotingContent } from './components/voting-content';
import { getHackathonVote, getJoinedHackathons } from '@/service/cach/resource/hackathon';

export default async function Page({ searchParams: { status = 'ongoing' } }: { searchParams: { status: string } }) {
  const votes = await getHackathonVote({ status });
  const { stats } = await getJoinedHackathons();
  return (
    <div className="mx-auto max-w-[952px] pb-12 pt-5">
      <BackLink href={{ pathname: '/hackathon/dashboard', query: { type: 'voting' } }} />
      <React.Suspense fallback={null}>
        <VotingContent votes={votes} stats={stats} />
      </React.Suspense>
    </div>
  );
}
