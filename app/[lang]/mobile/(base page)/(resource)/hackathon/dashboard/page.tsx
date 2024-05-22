import * as React from 'react';
import { getHackathonVote, getJoinedHackathons } from '@/service/cach/resource/hackathon';
import { DashboardContent } from './components/dashboard-content';
import { PageLayout } from '@/components/hackathon/page-layout';

export default async function Page() {
  const { hackathons, stats } = await getJoinedHackathons();
  const votes = await getHackathonVote();
  return (
    <PageLayout
      title="Your Hackathons"
      description="Welcome to your hackathon dashboard! Manage projects, invite teammates, and track your hackathon journey with ease—all in one place."
    >
      <React.Suspense fallback={null}>
        <DashboardContent stats={stats} hackathons={hackathons} votes={votes} />
      </React.Suspense>
    </PageLayout>
  );
}
