import React, { ReactNode, useMemo } from 'react';
import { ProjectDetailContext } from '../../../../constants/type';
import { HackathonType, ProjectType, ProjectVotesType } from '@/service/webApi/resourceStation/type';

interface ProjectProviderProp {
  children: ReactNode;
  isShowVoting: boolean;
  project: ProjectType;
  hackathon: HackathonType;
  projectVote: ProjectVotesType;
}

const ProjectProvider: React.FC<ProjectProviderProp> = ({
  children,
  isShowVoting,
  project,
  projectVote,
  hackathon
}) => {
  const titleTxtData = useMemo(() => {
    let navs = [
      'projectsDetail.title.overview',
      'projectsDetail.title.voting',
      'projectsDetail.title.videos',
      'projectsDetail.title.introduction',
      'projectsDetail.title.team'
    ];
    if (!isShowVoting) {
      navs = navs.filter((v) => v !== 'projectsDetail.title.voting');
    }
    if (!project?.pitchVideo && !project?.demoVideo) {
      navs = navs.filter((v) => v !== 'projectsDetail.title.videos');
    }
    if (!project?.members?.length) {
      navs = navs.filter((v) => v !== 'projectsDetail.title.team');
    }
    return navs;
  }, [isShowVoting, project]);
  return (
    <ProjectDetailContext.Provider value={{ titleTxtData, project, projectVote, hackathon }}>
      {children}
    </ProjectDetailContext.Provider>
  );
};

export default ProjectProvider;
