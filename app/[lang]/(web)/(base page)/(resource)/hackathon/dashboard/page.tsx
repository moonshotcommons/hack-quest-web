import * as React from 'react';
import { HackathonStats } from '@/components/hackathon/hackathon-stats';
import { VotingRole } from '@/components/hackathon/voting-role';
import { FollowDiscord } from '@/components/hackathon/follow-discord';
import { PageLayout } from '@/components/hackathon/page-layout';
import { HackathonContent } from './components/hackathon-content';
import { getHackathonVote, getJoinedHackathons } from '@/service/cach/resource/hackathon';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const { hackathons, stats } = await getJoinedHackathons();
  const votes = await getHackathonVote();
  return (
    <PageLayout
      title="Your Hackathons"
      description="Welcome to your hackathon dashboard! Manage projects, invite teammates, and track your hackathon journey with
    ease—all in one place."
    >
      <div className="mt-20 grid grid-cols-[1fr_320px] gap-10">
        <React.Suspense fallback={null}>
          <HackathonContent hackathons={hackathons} votes={votes} />
        </React.Suspense>
        <div className="flex flex-col gap-10">
          <div className="rounded-2xl bg-neutral-white p-6">
            <HackathonStats
              registered={stats.registered}
              submitted={stats.submitted}
              projectVoted={stats.projectVoted}
              winner={stats.winner}
            />
            <div className="my-5 h-px w-full bg-neutral-medium-gray" />
            <VotingRole votes={stats.votes} />
          </div>
          <FollowDiscord />
        </div>
      </div>
    </PageLayout>
  );
}
