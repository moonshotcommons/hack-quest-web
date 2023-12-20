import BaseLayout from '@/components/Layout/BaseLayout';

const LearningTrackLayout = ({ children }: { children: React.ReactNode }) => {
  console.log('learning track layout');
  return <BaseLayout excludeBreadcrumb={true}>{children}</BaseLayout>;
};

export default LearningTrackLayout;
