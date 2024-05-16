'use client';

import * as React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/hackathon/card-tabs';
import { HackathonCard } from './hackathon-card';
import { ViewAllLink } from '@/components/hackathon/view-all-link';
import { useQueryRouter } from '@/hooks/hackathon/use-query-router';
import { HackathonStats } from '@/components/hackathon/hackathon-stats';
import { VotingRole } from '@/components/hackathon/voting-role';
import { FollowDiscord } from '@/components/hackathon/follow-discord';

export function DashboardContent() {
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
          <div className="flex flex-col items-center gap-6">
            <HackathonCard title="Linea Mini-hack -May" tagName="REGISTERED" />
            <ViewAllLink href="/hackathon/dashboard/participated">View All Participated Hackathon</ViewAllLink>
          </div>
        </TabsContent>
        <TabsContent className="rounded-tr-none" value="voting">
          <div className="flex flex-col items-center gap-6">
            <HackathonCard title="Linea Mini-hack -May" tagName="REGISTERED" />
            <ViewAllLink href="/hackathon/dashboard/voting">View All Voting Hackathon</ViewAllLink>
          </div>
        </TabsContent>
      </Tabs>
      <div className="flex flex-col gap-8 px-5 py-8">
        <div className="rounded-2xl bg-neutral-white p-4">
          <HackathonStats />
          <div className="my-5 h-px w-full bg-neutral-medium-gray" />
          <VotingRole role="user" votes={{ user: 50, advocate: 100, judge: 200 }} />
        </div>
        <FollowDiscord />
      </div>
    </div>
  );
}
