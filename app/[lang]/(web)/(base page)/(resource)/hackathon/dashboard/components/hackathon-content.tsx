'use client';

import * as React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCustomPathname } from '@/hooks/router/useCheckPathname';
import { HackathonCard } from './hackathon-card';
import { ViewAllLink } from '@/components/hackathon/view-all-link';

export function HackathonContent() {
  const router = useRouter();
  const pathname = useCustomPathname();
  const searchParams = useSearchParams();

  const currentType = searchParams.get('type') || 'participated';

  const createQueryString = React.useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  function handleTypeChange(type: string) {
    router.push(pathname + '?' + createQueryString('type', type), { scroll: false });
  }

  return (
    <Tabs defaultValue="participated" className="w-full" value={currentType} onValueChange={handleTypeChange}>
      <TabsList>
        <TabsTrigger className="flex-1 rounded-b-none" value="participated">
          Participated Hackathon
        </TabsTrigger>
        <TabsTrigger className="flex-1 rounded-b-none" value="voting">
          Voting Hackathon
        </TabsTrigger>
      </TabsList>
      <TabsContent className="mt-0 rounded-b-3xl rounded-tr-3xl bg-neutral-white p-6" value="participated">
        <div className="flex flex-col items-center gap-8">
          <HackathonCard title="Linea Mini-hack -May" tagName="REGISTERED" />
          <HackathonCard title="Linea Mini-hack -May" tagName="MISSED" />
          <HackathonCard title="Linea Mini-hack -May" tagName="ENDED" />
          <ViewAllLink href="/hackathon/dashboard/participated">View All Participated Hackathon</ViewAllLink>
        </div>
      </TabsContent>
      <TabsContent className="mt-0 rounded-b-3xl rounded-tl-3xl bg-neutral-white p-6" value="voting">
        <div className="flex flex-col items-center gap-8">
          <HackathonCard title="Linea Mini-hack -May" tagName="REGISTERED" />
          <HackathonCard title="Linea Mini-hack -May" tagName="MISSED" />
          <ViewAllLink href="/hackathon/dashboard/voting">View All Voting Hackathon</ViewAllLink>
        </div>
      </TabsContent>
    </Tabs>
  );
}
