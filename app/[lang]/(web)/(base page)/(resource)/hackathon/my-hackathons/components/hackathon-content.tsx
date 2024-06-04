'use client';

import * as React from 'react';
import { HackathonCard } from './hackathon-card';
import { ViewAllLink } from '@/components/hackathon/view-all-link';
import { useQueryRouter } from '@/hooks/hackathon/use-query-router';
import { HackathonType, HackathonVoteType } from '@/service/webApi/resourceStation/type';
import HackathonEmpty from '@/components/hackathon/hackathon-empty';
import { HackathonVotingCard } from './hackathon-voting-card';
import MenuLink from '@/constants/MenuLink';
import { CardTabs } from '@/components/ecosystem/card-tabs';
import { cn } from '@/helper/utils';

const tabs = [
  {
    value: 'participated',
    label: 'Participated Hackathon'
  },
  {
    value: 'voting',
    label: 'Voting Hackathon'
  }
];

export function HackathonContent({ hackathons, votes }: { hackathons: HackathonType[]; votes: HackathonVoteType[] }) {
  const { value, onValueChange } = useQueryRouter({
    queryKey: 'type',
    defaultValue: 'participated'
  });

  return (
    <div className="flex flex-col">
      <CardTabs tabs={tabs} value={value} onValueChange={onValueChange} />
      <div
        className={cn('w-full rounded-2xl bg-neutral-white p-6', {
          'rounded-tl-none': value === 'participated',
          'rounded-tr-none': value === 'voting'
        })}
      >
        {value === 'participated' &&
          (hackathons.length === 0 ? (
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
              <ViewAllLink href={`${MenuLink.HACKATHON_DASHBOARD}/participated`}>
                View All Participated Hackathon
              </ViewAllLink>
            </div>
          ))}

        {value === 'voting' &&
          (votes.length === 0 ? (
            <HackathonEmpty text="You didn’t vote for any hackathon" label="go to vote" href="/hackathon/voting" />
          ) : (
            <div className="flex flex-col items-center gap-8">
              {votes.map((vote) => (
                <HackathonVotingCard key={vote.id} vote={vote} />
              ))}
              <ViewAllLink href={`${MenuLink.HACKATHON_DASHBOARD}/voting`}>View All Voting Hackathon</ViewAllLink>
            </div>
          ))}
      </div>
    </div>
  );
}
