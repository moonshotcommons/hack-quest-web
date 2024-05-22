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
    <div className="mt-[3.75rem]">
      <Tabs defaultValue="learn" className="w-full" value={value} onValueChange={onValueChange}>
        <TabsList>
          <TabsTrigger value="learn">Learn</TabsTrigger>
          <TabsTrigger value="build">Build</TabsTrigger>
          <TabsTrigger value="community">Community</TabsTrigger>
        </TabsList>
        <TabsContent className="sm:rounded-tl-none" value="learn">
          <LearnSection />
        </TabsContent>
        <TabsContent value="build">
          <BuildSection />
        </TabsContent>
        <TabsContent className="sm:rounded-tr-none" value="community">
          <CommunitySection />
        </TabsContent>
      </Tabs>
    </div>
  );
}
