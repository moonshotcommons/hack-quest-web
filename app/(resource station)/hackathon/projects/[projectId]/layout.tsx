import BaseLayout from '@/components/Layout/BaseLayout';

const ProjectDetailLayout = ({ children }: { children: React.ReactNode }) => {
  return <BaseLayout excludeBreadcrumb={true}>{children}</BaseLayout>;
};

export default ProjectDetailLayout;
