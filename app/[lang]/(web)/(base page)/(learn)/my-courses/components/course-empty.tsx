'use client';

import Link from 'next/link';
import Button from '@/components/Common/Button';
import { useShallow } from 'zustand/react/shallow';
import { ecosystemStore } from '@/store/zustand/ecosystemStore';
import { EcosystemCard } from '@/components/ecosystem/ecosystem-card';

export function CourseEmpty() {
  const { ecosystems } = ecosystemStore(
    useShallow((state) => ({
      ecosystems: state.ecosystems
    }))
  );
  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex flex-col items-center gap-4 py-8">
        <h2 className="text-base font-bold text-neutral-black sm:text-lg">You’re not enrolled in any course</h2>
        <Link href="/explore">
          <Button size="small" ghost className="uppercase">
            Explore courses
          </Button>
        </Link>
      </div>
      <div className="flex flex-col gap-5 sm:gap-8">
        <h2 className="text-lg font-bold text-neutral-black">Explore Certified Learning Track</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-4">
          {ecosystems?.map((ecosystem) => (
            <EcosystemCard
              key={ecosystem.id}
              name={`Build on ${ecosystem.name}`}
              title={ecosystem.name}
              description={ecosystem.description}
              href={`/explore/${ecosystem.id}`}
              tags={ecosystem.tags}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
