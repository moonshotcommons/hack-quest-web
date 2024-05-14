import { FollowDiscord } from './components/follow-discord';
import { HackathonContent } from './components/hackathon-content';
import { HackathonStats } from './components/hackathon-stats';
import { DashboardHeader } from './components/header';

export default function HackathonDashboard() {
  return (
    <div className="container mx-auto py-12">
      <DashboardHeader />
      <div className="mt-20 grid grid-cols-[1fr_320px] gap-10">
        <HackathonContent />
        <div className="flex flex-col gap-10">
          <HackathonStats />
          <FollowDiscord />
        </div>
      </div>
    </div>
  );
}
