'use client';

import * as React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/hackathon/line-tabs';
import { HackathonCard } from '../../components/hackathon-card';
import { useQueryRouter } from '@/hooks/hackathon/use-query-router';

export function ParticipatedContent() {
  const { value, onValueChange } = useQueryRouter({
    queryKey: 'status',
    defaultValue: 'ongoing'
  });
  return (
    <div className="mt-8">
      <h1 className="font-next-book-bold text-[1.75rem] font-bold text-neutral-black">Participated Hackathon</h1>
      <Tabs defaultValue="ongoing" className="mt-3 w-full" value={value} onValueChange={onValueChange}>
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
