'use client';

import * as React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/hackathon/line-tabs';
import { useQueryRouter } from '@/hooks/hackathon/use-query-router';
import { VotingRole } from '@/components/hackathon/voting-role';
import { HackathonVoteType } from '@/service/webApi/resourceStation/type';
import HackathonEmpty from '@/components/hackathon/hackathon-empty';
import { VotingHackathonCard } from './voting-hackathon-card';

export function VotingContent({ hackathons, votes }: { hackathons: HackathonVoteType[]; votes: any }) {
  const { value, onValueChange } = useQueryRouter({
    queryKey: 'status',
    defaultValue: 'ongoing'
  });
  return (
    <div className="mt-6">
      <h1 className="mb-6 font-next-book-bold text-[1.75rem] font-bold text-neutral-black">Voting Hackathon</h1>
      <VotingRole size="small" votes={votes} />
      <Tabs defaultValue="ongoing" className="mt-6 w-full" value={value} onValueChange={onValueChange}>
        <TabsList>
          <TabsTrigger value="ongoing">Ongoing Hackathon</TabsTrigger>
          <TabsTrigger value="past">Past Hackathon</TabsTrigger>
        </TabsList>
        <TabsContent value="ongoing">
          <div className="flex flex-col gap-8">
            {hackathons.length === 0 ? (
              <HackathonEmpty text="You didn’t vote for any hackathon" label="go to vote" href="/hackathon/voting" />
            ) : (
              <div className="flex flex-col items-center gap-8">
                {hackathons.map((hackathon) => (
                  <VotingHackathonCard key={hackathon.id} hackathon={hackathon} />
                ))}
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="past">
          <div className="flex flex-col gap-8">
            {hackathons.length === 0 ? (
              <HackathonEmpty text="You didn’t vote for any hackathon" label="go to vote" href="/hackathon/voting" />
            ) : (
              <div className="flex flex-col items-center gap-8">
                {hackathons.map((hackathon) => (
                  <VotingHackathonCard key={hackathon.id} hackathon={hackathon} />
                ))}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
