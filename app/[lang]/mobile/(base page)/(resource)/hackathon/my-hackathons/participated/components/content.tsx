'use client';

import * as React from 'react';
import { LineTabs } from '@/components/ecosystem/line-tabs';
import { useQueryRouter } from '@/hooks/hackathon/use-query-router';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import HackathonEmpty from '@/components/hackathon/hackathon-empty';
import { HackathonCard } from '../../components/hackathon-card';
import { useLang } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';

export function ParticipatedContent({ hackathons }: { hackathons: HackathonType[] }) {
  const { lang } = useLang();
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const { value, onValueChange } = useQueryRouter({
    queryKey: 'status',
    defaultValue: 'ongoing'
  });

  return (
    <div className="mt-6">
      <h1 className="mb-3 font-next-book-bold text-lg font-bold text-neutral-black">
        {t('dashboard.participatedHackathon')}
      </h1>
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
      />
      <div className="mt-6 flex flex-col gap-5">
        {hackathons.length === 0 ? (
          <HackathonEmpty
            text={t('dashboard.empty', { type: t('dashboard.participate') })}
            label={t('dashboard.exploreHackathon')}
            href="/hackathon/explore"
          />
        ) : (
          <div className="flex w-full flex-col gap-5">
            {hackathons.map((hackathon) => (
              <HackathonCard key={hackathon.id} hackathon={hackathon} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
