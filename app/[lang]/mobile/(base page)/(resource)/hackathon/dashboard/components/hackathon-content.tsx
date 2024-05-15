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
    router.push(pathname + '?' + createQueryString('type', type));
  }
  return (
    <Tabs defaultValue="participated" className="w-full" value={currentType} onValueChange={handleTypeChange}>
      <TabsList>
        <TabsTrigger className="flex-1 rounded-b-none px-6 py-3 text-base" value="participated">
          Participated
        </TabsTrigger>
        <TabsTrigger className="flex-1 rounded-b-none px-6 py-3 text-base" value="voting">
          Voting
        </TabsTrigger>
      </TabsList>
      <TabsContent className="mt-0 rounded-b-2xl rounded-tr-2xl bg-neutral-white px-5 pb-8 pt-6" value="participated">
        <div className="flex flex-col items-center gap-6">
          <HackathonCard title="Linea Mini-hack -May" tagName="REGISTERED" />
          <ViewAllLink href="/hackathon/dashboard/participated">View All Participated Hackathon</ViewAllLink>
        </div>
      </TabsContent>
      <TabsContent className="mt-0 rounded-b-2xl rounded-tl-2xl bg-neutral-white px-5 pb-8 pt-6" value="voting">
        Voting Hackathon
      </TabsContent>
    </Tabs>
  );
}
