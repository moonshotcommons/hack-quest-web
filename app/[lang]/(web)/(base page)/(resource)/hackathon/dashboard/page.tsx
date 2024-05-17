import { HackathonStats } from '@/components/hackathon/hackathon-stats';
import { VotingRole } from '@/components/hackathon/voting-role';
import { FollowDiscord } from '@/components/hackathon/follow-discord';
import { PageLayout } from '@/components/hackathon/page-layout';
import { HackathonContent } from './components/hackathon-content';

export default function HackathonDashboard({ searchParams: { type } }: { searchParams: { type: string } }) {
  return (
    <PageLayout
      title="Your Hackathons"
      description="Welcome to your hackathon dashboard! Manage projects, invite teammates, and track your hackathon journey with
    ease—all in one place."
    >
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
    </PageLayout>
  );
}
