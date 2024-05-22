import React, { ReactNode, useMemo } from 'react';
import { ProjectDetailContext } from '../../../../constants/type';

interface ProjectProviderProp {
  children: ReactNode;
  isShowVoting: boolean;
}

const ProjectProvider: React.FC<ProjectProviderProp> = ({ children, isShowVoting }) => {
  const titleTxtData = useMemo(() => {
    const navs = [
      'projectsDetail.title.overview',
      'projectsDetail.title.videos',
      'projectsDetail.title.introduction',
      'projectsDetail.title.team'
    ];
    if (isShowVoting) {
      navs.splice(1, 0, 'projectsDetail.title.voting');
    }
    return navs;
  }, [isShowVoting]);
  return <ProjectDetailContext.Provider value={{ titleTxtData }}>{children}</ProjectDetailContext.Provider>;
};

export default ProjectProvider;
