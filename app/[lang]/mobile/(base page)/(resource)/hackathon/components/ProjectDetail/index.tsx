'use client';
import { FC } from 'react';
import { useNeedPCRedirect } from '@/hooks/router/useNeedPCRedirect';
interface ProjectDetailProps {
  // project: ProjectType;
  // others: ProjectType[];
}

const ProjectDetail: FC<ProjectDetailProps> = (props) => {
  // const { project, others } = props;
  useNeedPCRedirect();
  return <div className=""></div>;
};

export default ProjectDetail;
