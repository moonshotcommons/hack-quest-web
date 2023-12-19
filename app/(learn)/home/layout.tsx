import BaseLayout from '@/components/Layout/BaseLayout';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return <BaseLayout excludeBreadcrumb={true}>{children}</BaseLayout>;
};

export default DashboardLayout;
