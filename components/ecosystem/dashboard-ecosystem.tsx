'use client';

import * as React from 'react';
import { useShallow } from 'zustand/react/shallow';
import { ecosystemStore } from '@/store/zustand/ecosystemStore';
import { useLang } from '@/components/Provider/Lang';
import { EcosystemCard } from './ecosystem-card-new';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';

export function DashboardEcosystem() {
  const { lang } = useLang();
  const { t } = useTranslation(lang, TransNs.ECOSYSTEM);
  const { ecosystems } = ecosystemStore(
    useShallow((state) => ({
      ecosystems: state.ecosystems
    }))
  );

  return (
    <div className="flex flex-col gap-5 rounded-2xl px-5 py-6 sm:gap-8 sm:rounded-3xl sm:bg-neutral-white sm:p-6">
      <h1 className="font-next-book-bold text-lg font-bold text-neutral-black sm:text-[1.375rem]">
        {t('explore_certified')}
      </h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {ecosystems.map((ecosystem) => (
          <EcosystemCard key={ecosystem.id} href={`/ecosystem-explore/${ecosystem.id}`} ecosystem={ecosystem} />
        ))}
      </div>
    </div>
  );
}
