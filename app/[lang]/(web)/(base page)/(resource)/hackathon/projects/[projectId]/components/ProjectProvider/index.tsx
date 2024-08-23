import React, { ReactNode, useMemo } from 'react';
import { ProjectDetailContext } from '../../../../constants/type';
import { HackathonType, ProjectType, ProjectVotesType } from '@/service/webApi/resourceStation/type';
import useDealHackathonData from '@/hooks/resource/useDealHackathonData';

interface ProjectProviderProp {
  children: ReactNode;
  project: ProjectType;
  hackathon: HackathonType;
  projectVote: ProjectVotesType;
}

const ProjectProvider: React.FC<ProjectProviderProp> = ({ children, project, projectVote, hackathon }) => {
  const { getStepIndex } = useDealHackathonData();
  const stepIndex = getStepIndex(hackathon);
  const isShowVoting = useMemo(() => {
    const isEnd = stepIndex === 2;
    return !!((isEnd && project.rewards?.length) || !isEnd);
  }, [project, stepIndex]);
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
    if (!project.detail?.detailedIntro) {
      navs = navs.filter((v) => v !== 'projectsDetail.title.introduction');
    }
    if (!project?.members?.length) {
      navs = navs.filter((v) => v !== 'projectsDetail.title.team');
    }
    return navs;
  }, [isShowVoting, project]);
  return (
    <ProjectDetailContext.Provider value={{ titleTxtData, project, projectVote, hackathon, isShowVoting }}>
      {children}
    </ProjectDetailContext.Provider>
  );
};

export default ProjectProvider;
