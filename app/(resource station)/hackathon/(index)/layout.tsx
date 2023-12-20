import BaseLayout from '@/components/Layout/BaseLayout';

const HackathonLayout = ({ children }: { children: React.ReactNode }) => {
  return <BaseLayout excludeBreadcrumb={true}>{children}</BaseLayout>;
};

export default HackathonLayout;
