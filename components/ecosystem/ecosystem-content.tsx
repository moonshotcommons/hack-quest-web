'use client';

import { LoaderIcon } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useParams, useSearchParams } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/hackathon/card-tabs';
import { useQueryRouter } from '@/hooks/hackathon/use-query-router';
import webApi from '@/service';
import { LearnSection } from './learn-section';
import { BuildSection } from './build-section';
import { CommunitySection } from './community-section';

function Loading() {
  return (
    <div className="flex h-full w-full items-center justify-center py-10 sm:py-20">
      <LoaderIcon className="h-6 w-6 animate-spin text-yellow-dark" />
    </div>
  );
}

export function EcosystemContent() {
  const searchParams = useSearchParams();

  const lang = searchParams?.get('lang') || 'en';

  const { ecosystemId } = useParams<{ ecosystemId: string }>();
  const { value, onValueChange } = useQueryRouter({
    queryKey: 'section',
    defaultValue: 'learn'
  });

  const { isLoading, data } = useQuery({
    enabled: !!ecosystemId,
    staleTime: Infinity,
    queryKey: ['ecosystemTasks', ecosystemId, lang],
    queryFn: () => webApi.ecosystemApi.getEcosystemTasks(ecosystemId, { lang })
  });

  return (
    <div className="pb-6 pt-4 sm:pb-0 sm:pt-[3.75rem]">
      <Tabs defaultValue="learn" className="w-full" value={value} onValueChange={onValueChange}>
        <TabsList>
          <TabsTrigger value="learn">Learn</TabsTrigger>
          <TabsTrigger value="build">Build</TabsTrigger>
          <TabsTrigger value="community">Community</TabsTrigger>
        </TabsList>
        <TabsContent className="rounded-tl-none sm:rounded-tl-none" value="learn">
          {isLoading && <Loading />}
          {data && <LearnSection tasks={data.learn} />}
        </TabsContent>
        <TabsContent value="build">
          {isLoading && <Loading />}
          {data && <BuildSection tasks={data.build} />}
        </TabsContent>
        <TabsContent className="rounded-tr-none sm:rounded-tr-none" value="community">
          {isLoading && <Loading />}
          {data && <CommunitySection tasks={data.community} />}
        </TabsContent>
      </Tabs>
    </div>
  );
}
