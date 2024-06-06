'use client';

import * as React from 'react';
import { HackathonCard } from './hackathon-card';
import { ViewAllLink } from '@/components/hackathon/view-all-link';
import { HackathonType, HackathonVoteType } from '@/service/webApi/resourceStation/type';
import HackathonEmpty from '@/components/hackathon/hackathon-empty';
import { HackathonVotingCard } from './hackathon-voting-card';
import MenuLink from '@/constants/MenuLink';
import { CardTabs } from '@/components/ecosystem/card-tabs';
import { cn } from '@/helper/utils';
import { useLang } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';

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
  const { lang } = useLang();
  const { t } = useTranslation(lang, TransNs.HACKATHON);

  const [value, setValue] = React.useState('participated');

  return (
    <div className="flex flex-col">
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
            <div className="flex flex-col items-center gap-8">
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
            <div className="flex flex-col items-center gap-8">
              {votes.map((vote) => (
                <HackathonVotingCard key={vote.id} vote={vote} />
              ))}
              <ViewAllLink href={`${MenuLink.HACKATHON_DASHBOARD}/voting`}>
                {t('dashboard.viewAll', { name: t('dashboard.votingHackathon') })}
              </ViewAllLink>
            </div>
          ))}
      </div>
    </div>
  );
}
