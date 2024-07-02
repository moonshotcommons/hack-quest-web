'use client';

import * as React from 'react';
import { useLang } from '@/components/Provider/Lang';
import { Skeleton } from '@/components/ui/skeleton';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { useQuery } from '@tanstack/react-query';
import webApi from '@/service';
import { EcosystemCard } from './ecosystem-card-new';

function EcosystemSkeleton() {
  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
      {[...Array(4)].map((_, index) => (
        <Skeleton className="h-[251px] w-full bg-neutral-white sm:bg-neutral-off-white" key={index} />
      ))}
    </div>
  );
}

export function DashboardEcosystem() {
  const { lang } = useLang();
  const { t } = useTranslation(lang, TransNs.ECOSYSTEM);

  const query = useQuery({
    staleTime: Infinity,
    queryKey: ['ecosystems', lang],
    queryFn: () => webApi.ecosystemApi.getEcosystems({ lang })
  });

  return (
    <div className="flex flex-col gap-5 rounded-2xl px-5 py-6 sm:gap-8 sm:rounded-3xl sm:bg-neutral-white sm:p-6">
      <h1 className="font-next-book-bold text-lg font-bold text-neutral-black sm:text-[1.375rem]">
        {t('explore_certified')}
      </h1>
      {query.isLoading && <EcosystemSkeleton />}
      {query.data && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {query.data?.map((ecosystem) => (
            <EcosystemCard key={ecosystem.id} href={`/ecosystem-explore/${ecosystem.id}`} ecosystem={ecosystem} />
          ))}
        </div>
      )}
    </div>
  );
}
