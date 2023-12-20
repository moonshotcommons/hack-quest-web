import BaseLayout from '@/components/Layout/BaseLayout';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  console.log('dashboard layout');
  return <BaseLayout excludeBreadcrumb={true}>{children}</BaseLayout>;
};

export default DashboardLayout;
