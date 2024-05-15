import { HackathonStats } from '@/components/hackathon/hackathon-stats';
import { VotingRole } from '@/components/hackathon/voting-role';
import { FollowDiscord } from '@/components/hackathon/follow-discord';
import { HackathonContent } from './components/hackathon-content';
import { DashboardHeader } from './components/header';

export default function HackathonDashboard({ searchParams: { type } }: { searchParams: { type: string } }) {
  return (
    <div className="container mx-auto py-12">
      <DashboardHeader />
      <div className="mt-20 grid grid-cols-[1fr_320px] gap-10">
        <HackathonContent />
        <div className="flex flex-col gap-10">
          <div className="rounded-2xl bg-neutral-white p-6">
            <HackathonStats />
            <div className="my-5 h-px w-full bg-neutral-medium-gray" />
            <VotingRole role="user" votes={{ user: 50, advocate: 100, judge: 200 }} />
          </div>
          <FollowDiscord />
        </div>
      </div>
    </div>
  );
}
