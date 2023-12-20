import BaseLayout from '@/components/Layout/BaseLayout';

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return <BaseLayout excludeBreadcrumb={true}>{children}</BaseLayout>;
};

export default ProfileLayout;
