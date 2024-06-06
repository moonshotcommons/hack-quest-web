'use client';

import * as React from 'react';
import { HackathonCard } from './hackathon-card';
import { ViewAllLink } from '@/components/hackathon/view-all-link';
import { HackathonStats } from '@/components/hackathon/hackathon-stats';
import { VotingRole } from '@/components/hackathon/voting-role';
import { FollowDiscord } from '@/components/hackathon/follow-discord';
import { HackathonType, HackathonVoteType } from '@/service/webApi/resourceStation/type';
import HackathonEmpty from '@/components/hackathon/hackathon-empty';
import MenuLink from '@/constants/MenuLink';
import { CardTabs } from '@/components/ecosystem/card-tabs';
import { cn } from '@/helper/utils';
import { HackathonVotingCard } from './hackathon-voting-card';
import { useLang } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';

export function DashboardContent({
  hackathons,
  stats,
  votes
}: {
  hackathons: HackathonType[];
  stats: any;
  votes: HackathonVoteType[];
}) {
  const { lang } = useLang();
  const { t } = useTranslation(lang, TransNs.HACKATHON);

  const [value, setValue] = React.useState('participated');

  return (
    <div className="mt-10 flex flex-col">
      <CardTabs
        tabs={[
          {
            value: 'participated',
            label: t('dashboard.participatedHackathon')
          },
          {
            value: 'voting',
            label: t('dashboard.votingHackathon')
          }
        ]}
        value={value}
        onValueChange={setValue}
      />
      <div
        className={cn('w-full rounded-2xl bg-neutral-white p-6', {
          'rounded-tl-none': value === 'participated',
          'rounded-tr-none': value === 'voting'
        })}
      >
        {value === 'participated' &&
          (hackathons.length === 0 ? (
            <HackathonEmpty
              text={t('dashboard.empty', { type: t('dashboard.participate') })}
              label={t('dashboard.exploreHackathon')}
              href="/hackathon/explore"
            />
          ) : (
            <div className="flex flex-col items-center gap-6">
              {hackathons.map((hackathon) => (
                <HackathonCard key={hackathon.id} hackathon={hackathon} />
              ))}
              <ViewAllLink href={`${MenuLink.HACKATHON_DASHBOARD}/participated`}>
                {t('dashboard.viewAll', { name: t('dashboard.participatedHackathon') })}
              </ViewAllLink>
            </div>
          ))}
        {value === 'voting' &&
          (votes.length === 0 ? (
            <HackathonEmpty
              text={t('dashboard.empty', { type: t('dashboard.vote') })}
              label={t('dashboard.goToVote')}
              href="/hackathon/voting"
            />
          ) : (
            <div className="flex flex-col items-center gap-6">
              {votes.map((vote) => (
                <HackathonVotingCard key={vote.id} vote={vote} />
              ))}
              <ViewAllLink href={`${MenuLink.HACKATHON_DASHBOARD}/voting`}>
                {t('dashboard.viewAll', { name: t('dashboard.votingHackathon') })}
              </ViewAllLink>
            </div>
          ))}
      </div>
      <div className="flex flex-col gap-8 px-5 py-8">
        <div className="rounded-2xl bg-neutral-white p-4">
          <HackathonStats
            registered={stats.registered}
            submitted={stats.submitted}
            winner={stats.winner}
            projectVoted={stats.projectVoted}
          />
          <div className="my-5 h-px w-full bg-neutral-medium-gray" />
          <VotingRole votes={stats.votes} />
        </div>
        <FollowDiscord />
      </div>
    </div>
  );
}
