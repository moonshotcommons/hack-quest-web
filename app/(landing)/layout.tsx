import BaseLayout from '@/components/Layout/BaseLayout';

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return <BaseLayout excludeBreadcrumb={true}>{children}</BaseLayout>;
};

export default LandingLayout;
