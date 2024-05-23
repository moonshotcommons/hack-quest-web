import * as React from 'react';
import { BackLink } from '@/components/hackathon/back-link';
import { VotingContent } from './components/voting-content';
import { getHackathonVote } from '@/service/cach/resource/hackathon';

export default async function Page({ searchParams: { status = 'ongoing' } }: { searchParams: { status: string } }) {
  const hackathons = await getHackathonVote({ status });
  return (
    <div className="min-h-[calc(100vh-4rem)] w-full p-5">
      <BackLink href={{ pathname: '/hackathon/dashboard', query: { type: 'voting' } }} />
      <React.Suspense fallback={null}>
        <VotingContent hackathons={hackathons} />
      </React.Suspense>
    </div>
  );
}
