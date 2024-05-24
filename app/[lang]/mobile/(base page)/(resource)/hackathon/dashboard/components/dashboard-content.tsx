'use client';

import * as React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/hackathon/card-tabs';
import { HackathonCard } from './hackathon-card';
import { ViewAllLink } from '@/components/hackathon/view-all-link';
import { useQueryRouter } from '@/hooks/hackathon/use-query-router';
import { HackathonStats } from '@/components/hackathon/hackathon-stats';
import { VotingRole } from '@/components/hackathon/voting-role';
import { FollowDiscord } from '@/components/hackathon/follow-discord';
import { HackathonType, HackathonVoteType } from '@/service/webApi/resourceStation/type';
import HackathonEmpty from '@/components/hackathon/hackathon-empty';
import { HackathonVotingCard } from './hackathon-voting-card';

export function DashboardContent({
  hackathons,
  stats,
  votes
}: {
  hackathons: HackathonType[];
  stats: any;
  votes: HackathonVoteType[];
}) {
  const { value, onValueChange } = useQueryRouter({
    queryKey: 'type',
    defaultValue: 'participated'
  });
  return (
    <div className="mt-10">
      <Tabs defaultValue="participated" className="w-full" value={value} onValueChange={onValueChange}>
        <TabsList>
          <TabsTrigger value="participated">Participated</TabsTrigger>
          <TabsTrigger value="voting">Voting</TabsTrigger>
        </TabsList>
        <TabsContent className="rounded-tl-none" value="participated">
          {hackathons.length === 0 ? (
            <HackathonEmpty
              text="You didn’t participate in any hackathon"
              label="Explore hackathons"
              href="/hackathon/explore"
            />
          ) : (
            <div className="flex flex-col items-center gap-6">
              {hackathons.map((hackathon) => (
                <HackathonCard key={hackathon.id} hackathon={hackathon} />
              ))}
              <ViewAllLink href="/hackathon/dashboard/participated">View All Participated Hackathon</ViewAllLink>
            </div>
          )}
        </TabsContent>
        <TabsContent className="rounded-tr-none" value="voting">
          {votes.length === 0 ? (
            <HackathonEmpty text="You didn’t vote for any hackathon" label="go to vote" href="/hackathon/voting" />
          ) : (
            <div className="flex flex-col items-center gap-6">
              {votes.map((vote) => (
                <HackathonVotingCard key={vote.id} vote={vote} />
              ))}
              <ViewAllLink href="/hackathon/dashboard/voting">View All Voting Hackathon</ViewAllLink>
            </div>
          )}
        </TabsContent>
      </Tabs>
      <div className="flex flex-col gap-8 px-5 py-8">
        <div className="rounded-2xl bg-neutral-white p-4">
          <HackathonStats
            registered={stats.registered}
            submitted={stats.submitted}
            winner={stats.winner}
            projectVoted={stats.projectVoted}
          />
          <div className="my-5 h-px w-full bg-neutral-medium-gray" />
          <VotingRole votes={stats.votes} />
        </div>
        <FollowDiscord />
      </div>
    </div>
  );
}
