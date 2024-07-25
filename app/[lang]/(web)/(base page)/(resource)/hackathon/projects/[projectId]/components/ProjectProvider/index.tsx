import React, { ReactNode, useMemo } from 'react';
import { ProjectDetailContext } from '../../../../constants/type';
import { HackathonType, ProjectType, ProjectVotesType } from '@/service/webApi/resourceStation/type';
import dayjs from '@/components/Common/Dayjs';

interface ProjectProviderProp {
  children: ReactNode;
  project: ProjectType;
  hackathon: HackathonType;
  projectVote: ProjectVotesType;
}

const ProjectProvider: React.FC<ProjectProviderProp> = ({ children, project, projectVote, hackathon }) => {
  const isShowVoting = useMemo(() => {
    const isEnd = dayjs().tz().isAfter(hackathon?.timeline?.rewardTime);
    return !!((isEnd && projectVote.totalVotes) || !isEnd);
  }, [hackathon, projectVote]);
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
    if (!project.detail?.oneLineIntro) {
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
