import { DashboardHeader } from './components/dashboard-header';
import { DashboardContent } from './components/dashboard-content';

export default function HackathonDashboard() {
  return (
    <div className="h-full w-full">
      <DashboardHeader />
      <DashboardContent />
    </div>
  );
}
