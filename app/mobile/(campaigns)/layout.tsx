import BaseLayout from '@/components/Layout/BaseLayout';

const CampaignsLayout = ({ children }: { children: React.ReactNode }) => {
  return <BaseLayout excludeBreadcrumb={true}>{children}</BaseLayout>;
};

export default CampaignsLayout;
