'use client';

import * as React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/hackathon/line-tabs';
import { HackathonCard } from '../../components/hackathon-card';
import { useQueryRouter } from '@/hooks/hackathon/use-query-router';
import { VotingRole } from '@/components/hackathon/voting-role';

export function VotingContent() {
  const { value, onValueChange } = useQueryRouter({
    queryKey: 'status',
    defaultValue: 'ongoing'
  });
  return (
    <div className="mt-6">
      <h1 className="mb-6 font-next-book-bold text-[1.75rem] font-bold text-neutral-black">Voting Hackathon</h1>
      <VotingRole role="user" size="small" votes={{ user: 50, advocate: 100, judge: 200 }} />
      <Tabs defaultValue="ongoing" className="mt-6 w-full" value={value} onValueChange={onValueChange}>
        <TabsList>
          <TabsTrigger value="ongoing">Ongoing Hackathon</TabsTrigger>
          <TabsTrigger value="past">Past Hackathon</TabsTrigger>
        </TabsList>
        <TabsContent value="ongoing">
          <div className="flex flex-col gap-8">
            <HackathonCard title="Linea Mini-hack -May" tagName="REGISTERED" />
            <HackathonCard title="Linea Mini-hack -May" tagName="MISSED" />
            <HackathonCard title="Linea Mini-hack -May" tagName="ENDED" />
            <HackathonCard title="Linea Mini-hack -May" tagName="ENDED" />
            <HackathonCard title="Linea Mini-hack -May" tagName="ENDED" />
          </div>
        </TabsContent>
        <TabsContent value="past">
          <div className="flex flex-col gap-8">
            <HackathonCard title="Linea Mini-hack -May" tagName="REGISTERED" />
            <HackathonCard title="Linea Mini-hack -May" tagName="MISSED" />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
