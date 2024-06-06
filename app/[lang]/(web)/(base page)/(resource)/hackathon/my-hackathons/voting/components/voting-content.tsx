'use client';

import * as React from 'react';
import { LineTabs } from '@/components/ecosystem/line-tabs';
import { useQueryRouter } from '@/hooks/hackathon/use-query-router';
import { VotingRole } from '@/components/hackathon/voting-role';
import { HackathonVoteType } from '@/service/webApi/resourceStation/type';
import HackathonEmpty from '@/components/hackathon/hackathon-empty';
import { HackathonVotingCard } from '../../components/hackathon-voting-card';
import PastHackathonCard from '../../../components/HackathonBox/Past/PastHackathonCard';
import { useLang } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';

export function VotingContent({ votes, stats }: { votes: HackathonVoteType[]; stats: any }) {
  const { lang } = useLang();
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const { value, onValueChange } = useQueryRouter({
    queryKey: 'status',
    defaultValue: 'ongoing'
  });
  return (
    <div className="mt-8">
      <h1 className="mb-8 font-next-book-bold text-[1.75rem] font-bold text-neutral-black">
        {t('dashboard.votingHackathon')}
      </h1>
      <VotingRole size="large" votes={stats.votes} />
      <LineTabs
        tabs={[
          {
            value: 'ongoing',
            label: t('dashboard.ongoingHackathon')
          },
          {
            value: 'past',
            label: t('dashboard.pastHackathon')
          }
        ]}
        value={value}
        onValueChange={onValueChange}
        className="mt-8"
        labelClassName="text-2xl"
      />
      <div className="mt-8 flex w-full flex-col gap-8">
        {votes.length === 0 ? (
          <HackathonEmpty
            text={t('dashboard.empty', { type: t('dashboard.vote') })}
            label={t('dashboard.goToVote')}
            href="/hackathon/voting"
          />
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
