import * as React from 'react';
import { redirect } from 'next/navigation';
import { BackLink } from '@/components/hackathon/back-link';
import { VotingContent } from './components/voting-content';
import { getHackathonVote, getJoinedHackathons } from '@/service/cach/resource/hackathon';
import MenuLink from '@/constants/MenuLink';

export default async function Page({ searchParams: { status = 'ongoing' } }: { searchParams: { status: string } }) {
  try {
    const votes = await getHackathonVote({ status });
    const { stats } = await getJoinedHackathons();
    return (
      <div className="mx-auto max-w-[952px] pb-12 pt-5">
        <BackLink href={{ pathname: MenuLink.HACKATHON_DASHBOARD }} />
        <React.Suspense fallback={null}>
          <VotingContent votes={votes} stats={stats} />
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
