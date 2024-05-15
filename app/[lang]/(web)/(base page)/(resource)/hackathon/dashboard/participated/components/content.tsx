'use client';

import * as React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HackathonCard } from '../../components/hackathon-card';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCustomPathname } from '@/hooks/router/useCheckPathname';

const tabsTriggerClassName =
  'flex-1 p-0 relative text-2xl text-neutral-off-black data-[state=active]:bg-transparent data-[state=active]:after:absolute data-[state=active]:after:left-0 data-[state=active]:after:-bottom-1 data-[state=active]:after:h-[3px] data-[state=active]:after:w-full data-[state=active]:after:bg-yellow-dark data-[state=active]:content-[""]';

export function ParticipatedContent() {
  const router = useRouter();
  const pathname = useCustomPathname();
  const searchParams = useSearchParams();

  const status = searchParams.get('status') || 'ongoing';

  const createQueryString = React.useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  function handleStatusChange(type: string) {
    router.push(pathname + '?' + createQueryString('status', type));
  }
  return (
    <Tabs defaultValue="ongoing" className="mt-3 w-full" value={status} onValueChange={handleStatusChange}>
      <TabsList className="w-[423px] gap-[1.875rem]">
        <TabsTrigger className={tabsTriggerClassName} value="ongoing">
          Ongoing Hackathon
        </TabsTrigger>
        <TabsTrigger className={tabsTriggerClassName} value="past">
          Past Hackathon
        </TabsTrigger>
      </TabsList>
      <TabsContent className="mt-8" value="ongoing">
        <div className="flex flex-col gap-8">
          <HackathonCard title="Linea Mini-hack -May" tagName="REGISTERED" />
          <HackathonCard title="Linea Mini-hack -May" tagName="MISSED" />
          <HackathonCard title="Linea Mini-hack -May" tagName="ENDED" />
          <HackathonCard title="Linea Mini-hack -May" tagName="ENDED" />
          <HackathonCard title="Linea Mini-hack -May" tagName="ENDED" />
        </div>
      </TabsContent>
      <TabsContent className="mt-8" value="past">
        <div className="flex flex-col gap-8">
          <HackathonCard title="Linea Mini-hack -May" tagName="REGISTERED" />
          <HackathonCard title="Linea Mini-hack -May" tagName="MISSED" />
        </div>
      </TabsContent>
    </Tabs>
  );
}
