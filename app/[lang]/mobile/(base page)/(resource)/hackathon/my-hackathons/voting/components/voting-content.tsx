'use client';

import * as React from 'react';
import { useQueryRouter } from '@/hooks/hackathon/use-query-router';
import { LineTabs } from '@/components/ecosystem/line-tabs';
import { VotingRole } from '@/components/hackathon/voting-role';
import { HackathonVoteType } from '@/service/webApi/resourceStation/type';
import HackathonEmpty from '@/components/hackathon/hackathon-empty';
import { VotingHackathonCard } from './voting-hackathon-card';
import { useLang } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';

export function VotingContent({ hackathons, votes }: { hackathons: HackathonVoteType[]; votes: any }) {
  const { lang } = useLang();
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const { value, onValueChange } = useQueryRouter({
    queryKey: 'status',
    defaultValue: 'ongoing'
  });
  return (
    <div className="mt-6">
      <h1 className="mb-6 font-next-book-bold text-[1.75rem] font-bold text-neutral-black">
        {t('dashboard.votingHackathon')}
      </h1>
      <VotingRole size="small" votes={votes} />
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
        className="mt-6"
      />
      <div className="mt-6 flex flex-col gap-5">
        {hackathons.length === 0 ? (
          <HackathonEmpty
            text={t('dashboard.empty', { type: t('dashboard.vote') })}
            label={t('dashboard.goToVote')}
            href="/hackathon/voting"
          />
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
