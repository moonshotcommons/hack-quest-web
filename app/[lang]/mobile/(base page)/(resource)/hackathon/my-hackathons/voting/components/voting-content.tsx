'use client';

import * as React from 'react';
import { useQueryRouter } from '@/hooks/hackathon/use-query-router';
import { LineTabs } from '@/components/ecosystem/line-tabs';
import { VotingRole } from '@/components/hackathon/voting-role';
import { HackathonVoteType } from '@/service/webApi/resourceStation/type';
import HackathonEmpty from '@/components/hackathon/hackathon-empty';
import { VotingHackathonCard } from './voting-hackathon-card';

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

export function VotingContent({ hackathons, votes }: { hackathons: HackathonVoteType[]; votes: any }) {
  const { value, onValueChange } = useQueryRouter({
    queryKey: 'status',
    defaultValue: 'ongoing'
  });
  return (
    <div className="mt-6">
      <h1 className="mb-6 font-next-book-bold text-[1.75rem] font-bold text-neutral-black">Voting Hackathon</h1>
      <VotingRole size="small" votes={votes} />
      <LineTabs tabs={tabs} value={value} onValueChange={onValueChange} className="mt-6" />
      <div className="mt-6 flex flex-col gap-5">
        {hackathons.length === 0 ? (
          <HackathonEmpty text="You didn’t vote for any hackathon" label="go to vote" href="/hackathon/voting" />
        ) : (
          <div className="flex flex-col items-center gap-5">
            {hackathons.map((hackathon) => (
              <VotingHackathonCard key={hackathon.id} hackathon={hackathon} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
