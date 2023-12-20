import BaseLayout from '@/components/Layout/BaseLayout';

const hackathonDetailLayout = ({ children }: { children: React.ReactNode }) => {
  return <BaseLayout excludeBreadcrumb={true}>{children}</BaseLayout>;
};

export default hackathonDetailLayout;
