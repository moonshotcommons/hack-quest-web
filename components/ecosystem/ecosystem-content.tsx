'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/hackathon/card-tabs';
import { useQueryRouter } from '@/hooks/hackathon/use-query-router';
import { LearnSection } from './learn-section';
import { BuildSection } from './build-section';
import { CommunitySection } from './community-section';

export function EcosystemContent() {
  const { value, onValueChange } = useQueryRouter({
    queryKey: 'section',
    defaultValue: 'learn'
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
          <LearnSection />
        </TabsContent>
        <TabsContent value="build">
          <BuildSection />
        </TabsContent>
        <TabsContent className="rounded-tr-none sm:rounded-tr-none" value="community">
          <CommunitySection />
        </TabsContent>
      </Tabs>
    </div>
  );
}
