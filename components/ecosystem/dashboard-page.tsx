'use client';

import Link from 'next/link';
import { useShallow } from 'zustand/react/shallow';
import Button from '@/components/Common/Button';
import PageRetentionTime from '@/components/Common/PageRetentionTime';
import { ecosystemStore } from '@/store/zustand/ecosystemStore';
import { EcosystemCard } from './ecosystem-card';

export default function Page() {
  const { ecosystems } = ecosystemStore(
    useShallow((state) => ({
      ecosystems: state.ecosystems
    }))
  );

  // TODO: If the user selects an ecosystem, redirect to that ecosystem page

  return (
    <>
      <div className="mt-8 flex flex-col gap-8">
        <div className="flex flex-col items-center justify-center gap-4 p-4">
          <h2 className="text-base font-bold text-neutral-off-black sm:text-lg">
            You’re not enrolled in any learning track
          </h2>
          <Link href="/explore">
            <Button size="small" ghost className="text-xs uppercase">
              Explore ecosystems
            </Button>
          </Link>
        </div>
        <div className="flex flex-col gap-5 px-5 pb-6 sm:gap-8 sm:px-0 sm:pb-0">
          <h2 className="font-next-book-bold text-lg font-bold text-neutral-black">Explore Certified Learning Track</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {ecosystems.map((ecosystem) => (
              <EcosystemCard
                key={ecosystem.id}
                title={`Certified ${ecosystem.name}`}
                name={ecosystem.name}
                description={ecosystem.description}
                href={`/explore/${ecosystem.id}`}
                tags={ecosystem.tags}
              />
            ))}
          </div>
        </div>
      </div>
      <PageRetentionTime trackName="dashboard-页面留存时间" />
    </>
  );
}
