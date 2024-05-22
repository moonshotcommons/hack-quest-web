import React, { ReactNode, useMemo } from 'react';
import { ProjectDetailContext } from '../../../../constants/type';
import { ProjectType } from '@/service/webApi/resourceStation/type';

interface ProjectProviderProp {
  project: ProjectType;
  children: ReactNode;
}

const ProjectProvider: React.FC<ProjectProviderProp> = ({ project, children }) => {
  console.info(project);
  const titleTxtData = useMemo(() => {
    return [
      'projectsDetail.title.overview',
      // 'projectsDetail.title.voting',
      'projectsDetail.title.videos',
      'projectsDetail.title.introduction',
      'projectsDetail.title.team'
    ];
  }, [project]);
  return <ProjectDetailContext.Provider value={{ titleTxtData }}>{children}</ProjectDetailContext.Provider>;
};

export default ProjectProvider;
