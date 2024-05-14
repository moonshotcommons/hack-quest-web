import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Participated } from './participated';

export function HackathonContent() {
  return (
    <Tabs defaultValue="participated" className="w-full">
      <TabsList>
        <TabsTrigger className="flex-1 rounded-b-none px-6 py-3 text-base" value="participated">
          Participated
        </TabsTrigger>
        <TabsTrigger className="flex-1 rounded-b-none px-6 py-3 text-base" value="voting">
          Voting
        </TabsTrigger>
      </TabsList>
      <TabsContent className="mt-0 rounded-b-2xl rounded-tr-2xl bg-neutral-white px-5 pb-8 pt-6" value="participated">
        <Participated />
      </TabsContent>
      <TabsContent className="mt-0 rounded-b-2xl rounded-tl-2xl bg-neutral-white px-5 pb-8 pt-6" value="voting">
        Voting Hackathon
      </TabsContent>
    </Tabs>
  );
}
