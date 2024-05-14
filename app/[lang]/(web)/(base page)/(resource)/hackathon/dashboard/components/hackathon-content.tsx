import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Participated } from './participated-hackathon';

export function HackathonContent() {
  return (
    <Tabs defaultValue="participated" className="w-full">
      <TabsList>
        <TabsTrigger className="flex-1 rounded-b-none" value="participated">
          Participated Hackathon
        </TabsTrigger>
        <TabsTrigger className="flex-1 rounded-b-none" value="voting">
          Voting Hackathon
        </TabsTrigger>
      </TabsList>
      <TabsContent className="mt-0 rounded-b-3xl rounded-tr-3xl bg-neutral-white p-6" value="participated">
        <Participated />
      </TabsContent>
      <TabsContent className="mt-0 rounded-b-3xl rounded-tl-3xl bg-neutral-white p-6" value="voting">
        Voting Hackathon
      </TabsContent>
    </Tabs>
  );
}
