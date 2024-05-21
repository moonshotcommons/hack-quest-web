import * as React from 'react';
import { getJoinedHackathons } from '@/service/cach/resource/hackathon';
import { DashboardContent } from './components/dashboard-content';
import { PageLayout } from '@/components/hackathon/page-layout';

export default async function Page() {
  const hackathons = await getJoinedHackathons();
  return (
    <PageLayout
      title="Your Hackathons"
      description="Welcome to your hackathon dashboard! Manage projects, invite teammates, and track your hackathon journey with ease—all in one place."
    >
      <React.Suspense fallback={null}>
        <DashboardContent hackathons={hackathons} />
      </React.Suspense>
    </PageLayout>
  );
}
