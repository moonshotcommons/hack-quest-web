'use client';

import * as React from 'react';
import { LineTabs } from '@/components/ecosystem/line-tabs';
import { useQueryRouter } from '@/hooks/hackathon/use-query-router';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import HackathonEmpty from '@/components/hackathon/hackathon-empty';
import { HackathonCard } from '../../components/hackathon-card';

const tabs = [
  {
    value: 'ongoing',
    label: 'Ongoing Hackathon'
  },
  {
    value: 'past',
    label: 'Past Hackathon'
  }
];

export function ParticipatedContent({ hackathons }: { hackathons: HackathonType[] }) {
  const { value, onValueChange } = useQueryRouter({
    queryKey: 'status',
    defaultValue: 'ongoing'
  });
  return (
    <div className="mt-8">
      <h1 className="mb-3 font-next-book-bold text-[1.75rem] font-bold text-neutral-black">Participated Hackathon</h1>
      <LineTabs tabs={tabs} value={value} onValueChange={onValueChange} labelClassName="text-2xl" />
      <div className="mt-8 flex w-full flex-col gap-8">
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
    </div>
  );
}