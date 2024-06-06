import * as React from 'react';
import { redirect } from 'next/navigation';
import { BackLink } from '@/components/hackathon/back-link';
import { getHackathonVote, getJoinedHackathons } from '@/service/cach/resource/hackathon';
import MenuLink from '@/constants/MenuLink';
import { VotingContent } from './components/voting-content';

export default async function Page({ searchParams: { status = 'ongoing' } }: { searchParams: { status: string } }) {
  try {
    const hackathons = await getHackathonVote({ status });
    const { stats } = await getJoinedHackathons();
    return (
      <div className="min-h-[calc(100vh-4rem)] w-full p-5">
        <BackLink href={{ pathname: MenuLink.HACKATHON_DASHBOARD }} />
        <React.Suspense fallback={null}>
          <VotingContent hackathons={hackathons} votes={stats.votes} />
        </React.Suspense>
      </div>
    );
  } catch (error: any) {
    if (error.code === 401) {
      redirect('/');
    }
    throw new Error(error);
  }
}
