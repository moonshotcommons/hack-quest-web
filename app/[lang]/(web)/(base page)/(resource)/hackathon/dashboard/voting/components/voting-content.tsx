'use client';

import * as React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/hackathon/line-tabs';
import { useQueryRouter } from '@/hooks/hackathon/use-query-router';
import { VotingRole } from '@/components/hackathon/voting-role';
import { HackathonVoteType } from '@/service/webApi/resourceStation/type';
import HackathonEmpty from '@/components/hackathon/hackathon-empty';
import { HackathonVotingCard } from '../../components/hackathon-voting-card';
import PastHackathonCard from '../../../components/HackathonBox/Past/PastHackathonCard';

export function VotingContent({ votes }: { votes: HackathonVoteType[] }) {
  const { value, onValueChange } = useQueryRouter({
    queryKey: 'status',
    defaultValue: 'ongoing'
  });
  return (
    <div className="mt-8">
      <h1 className="mb-8 font-next-book-bold text-[1.75rem] font-bold text-neutral-black">Voting Hackathon</h1>
      <VotingRole role="user" size="large" votes={{ user: 50, advocate: 100, judge: 200 }} />
      <Tabs defaultValue="ongoing" className="mt-8 w-full" value={value} onValueChange={onValueChange}>
        <TabsList>
          <TabsTrigger value="ongoing">Ongoing Hackathon</TabsTrigger>
          <TabsTrigger value="past">Past Hackathon</TabsTrigger>
        </TabsList>
        <TabsContent value="ongoing">
          <div className="flex w-full flex-col gap-8">
            {votes.length === 0 ? (
              <HackathonEmpty text="You didn’t vote for any hackathon" label="go to vote" href="/hackathon/voting" />
            ) : (
              <div className="flex w-full flex-col gap-8">
                {votes.map((vote) => (
                  <HackathonVotingCard key={vote.id} vote={vote} />
                ))}
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="past">
          <div className="flex w-full flex-col gap-8">
            {votes.length === 0 ? (
              <HackathonEmpty text="You didn’t vote for any hackathon" label="go to vote" href="/hackathon/voting" />
            ) : (
              <div className="grid grid-cols-3 gap-x-5 gap-y-8">
                {votes.map((vote) => (
                  <PastHackathonCard key={vote.id} isVoting hackathon={vote} />
                ))}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
