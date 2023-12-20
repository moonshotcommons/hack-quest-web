import BaseLayout from '@/components/Layout/BaseLayout';

const ElectivesLayout = ({ children }: { children: React.ReactNode }) => {
  return <BaseLayout excludeBreadcrumb={true}>{children}</BaseLayout>;
};

export default ElectivesLayout;
