import { DashboardContent } from './components/dashboard-content';
import { PageLayout } from '@/components/hackathon/page-layout';

export default function HackathonDashboard() {
  return (
    <PageLayout
      title="Your Hackathons"
      description="Welcome to your hackathon dashboard! Manage projects, invite teammates, and track your hackathon journey with ease—all in one place."
    >
      {/* <DashboardHeader /> */}
      <DashboardContent />
    </PageLayout>
  );
}
