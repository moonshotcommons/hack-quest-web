'use client';

import * as React from 'react';
import { LineTabs } from '@/components/ecosystem/line-tabs';
import { useQueryRouter } from '@/hooks/hackathon/use-query-router';
import { VotingRole } from '@/components/hackathon/voting-role';
import { HackathonVoteType } from '@/service/webApi/resourceStation/type';
import HackathonEmpty from '@/components/hackathon/hackathon-empty';
import { HackathonVotingCard } from '../../components/hackathon-voting-card';
import PastHackathonCard from '../../../components/HackathonBox/Past/PastHackathonCard';

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

export function VotingContent({ votes, stats }: { votes: HackathonVoteType[]; stats: any }) {
  const { value, onValueChange } = useQueryRouter({
    queryKey: 'status',
    defaultValue: 'ongoing'
  });
  return (
    <div className="mt-8">
      <h1 className="mb-8 font-next-book-bold text-[1.75rem] font-bold text-neutral-black">Voting Hackathon</h1>
      <VotingRole size="large" votes={stats.votes} />
      <LineTabs tabs={tabs} value={value} onValueChange={onValueChange} className="mt-8" labelClassName="text-2xl" />
      <div className="mt-8 flex w-full flex-col gap-8">
        {votes.length === 0 ? (
          <HackathonEmpty text="You didn’t vote for any hackathon" label="go to vote" href="/hackathon/voting" />
        ) : value === 'ongoing' ? (
          <div className="flex w-full flex-col gap-8">
            {votes.map((vote) => (
              <HackathonVotingCard key={vote.id} vote={vote} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-x-5 gap-y-8">
            {votes.map((vote) => (
              <PastHackathonCard key={vote.id} isVoting hackathon={vote} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
