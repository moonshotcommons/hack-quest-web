'use client';

import * as React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/hackathon/card-tabs';
import { HackathonCard } from './hackathon-card';
import { ViewAllLink } from '@/components/hackathon/view-all-link';
import { useQueryRouter } from '@/hooks/hackathon/use-query-router';
import { HackathonType, HackathonVoteType } from '@/service/webApi/resourceStation/type';
import HackathonEmpty from '@/components/hackathon/hackathon-empty';
import { HackathonVotingCard } from './hackathon-voting-card';

export function HackathonContent({ hackathons, votes }: { hackathons: HackathonType[]; votes: HackathonVoteType[] }) {
  const { value, onValueChange } = useQueryRouter({
    queryKey: 'type',
    defaultValue: 'participated'
  });

  return (
    <Tabs defaultValue="participated" className="w-full" value={value} onValueChange={onValueChange}>
      <TabsList>
        <TabsTrigger value="participated">Participated Hackathon</TabsTrigger>
        <TabsTrigger value="voting">Voting Hackathon</TabsTrigger>
      </TabsList>
      <TabsContent className="sm:rounded-tl-none" value="participated">
        {hackathons.length === 0 ? (
          <HackathonEmpty
            text="You didn’t participate in any hackathon"
            label="Explore hackathons"
            href="/hackathon/explore"
          />
        ) : (
          <div className="flex flex-col items-center gap-8">
            {hackathons.map((hackathon) => (
              <HackathonCard key={hackathon.id} hackathon={hackathon} />
            ))}
            <ViewAllLink href="/hackathon/dashboard/participated">View All Participated Hackathon</ViewAllLink>
          </div>
        )}
      </TabsContent>
      <TabsContent className="sm:rounded-tr-none" value="voting">
        {votes.length === 0 ? (
          <HackathonEmpty text="You didn’t vote for any hackathon" label="go to vote" href="/hackathon/voting" />
        ) : (
          <div className="flex flex-col items-center gap-8">
            {votes.map((vote) => (
              <HackathonVotingCard key={vote.id} vote={vote} />
            ))}
            <ViewAllLink href="/hackathon/dashboard/voting">View All Voting Hackathon</ViewAllLink>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}
