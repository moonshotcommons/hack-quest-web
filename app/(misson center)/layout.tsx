import BaseLayout from '@/components/Layout/BaseLayout';

const MissionCenterLayout = ({ children }: { children: React.ReactNode }) => {
  return <BaseLayout excludeBreadcrumb={true}>{children}</BaseLayout>;
};

export default MissionCenterLayout;
