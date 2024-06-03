'use client';

import * as React from 'react';
import { useShallow } from 'zustand/react/shallow';
import { ecosystemStore } from '@/store/zustand/ecosystemStore';
import { EcosystemCard } from './ecosystem-card-new';

export function DashboardEcosystem() {
  const { ecosystems } = ecosystemStore(
    useShallow((state) => ({
      ecosystems: state.ecosystems
    }))
  );

  return (
    <div className="flex flex-col gap-8 rounded-3xl bg-neutral-white sm:p-6">
      <h1 className="font-next-book-bold text-[1.375rem] font-bold text-neutral-black">
        Explore Certified Learning Tracks
      </h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {ecosystems.map((ecosystem) => (
          <EcosystemCard key={ecosystem.id} href={`/ecosystem-explore/${ecosystem.id}`} ecosystem={ecosystem} />
        ))}
      </div>
    </div>
  );
}
