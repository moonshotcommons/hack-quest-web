'use client';
import { useNeedPCRedirect } from '@/hooks/router/useNeedPCRedirect';
import { FC } from 'react';

interface ProjectDetailPageProps {}

const ProjectDetailPage: FC<ProjectDetailPageProps> = () => {
  useNeedPCRedirect();
  return <div></div>;
};

export default ProjectDetailPage;
