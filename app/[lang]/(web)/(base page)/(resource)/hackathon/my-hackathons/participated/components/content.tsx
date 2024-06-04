'use client';

import * as React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/hackathon/line-tabs';
import { useQueryRouter } from '@/hooks/hackathon/use-query-router';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import HackathonEmpty from '@/components/hackathon/hackathon-empty';
import { HackathonCard } from '../../components/hackathon-card';

export function ParticipatedContent({ hackathons }: { hackathons: HackathonType[] }) {
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
          <div className="flex w-full flex-col gap-8">
            {hackathons.length === 0 ? (
              <HackathonEmpty
                text="You didn’t participate in any hackathon"
                label="Explore hackathons"
                href="/hackathon/explore"
              />
            ) : (
              <div className="flex w-full flex-col gap-8">
                {hackathons.map((hackathon) => (
                  <HackathonCard key={hackathon.id} hackathon={hackathon} />
                ))}
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="past">
          <div className="flex w-full flex-col gap-8">
            {hackathons.length === 0 ? (
              <HackathonEmpty
                text="You didn’t participate in any hackathon"
                label="Explore hackathons"
                href="/hackathon/explore"
              />
            ) : (
              <div className="flex w-full flex-col gap-8">
                {hackathons.map((hackathon) => (
                  <HackathonCard key={hackathon.id} hackathon={hackathon} />
                ))}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
