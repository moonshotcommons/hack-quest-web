import FullLayout from '@/components/Layout/FullLayout';

const LessonPageLayout = ({ children }: { children: React.ReactNode }) => {
  return <FullLayout excludeBreadcrumb={true}>{children}</FullLayout>;
};

export default LessonPageLayout;
