'use client';
import { HackathonType, ProjectRankType, ProjectType } from '@/service/webApi/resourceStation/type';
import React, { useMemo, useState } from 'react';
import Content from './Content';
import { useRequest } from 'ahooks';
import webApi from '@/service';
import FeaturedProjects from '../../../components/FeaturedProject';
import dayjs from 'dayjs';
import CloseIn from './CloseIn';
import ProjectProvider from '@/app/[lang]/(web)/(base page)/(resource)/hackathon/projects/[projectId]/components/ProjectProvider';

interface ProjectDetailProp {
  project: ProjectType;
  otherProjects: ProjectType[];
}

const ProjectDetail: React.FC<ProjectDetailProp> = ({ project, otherProjects }) => {
  const [hackathon, setHackathon] = useState<HackathonType>();
  const [rankInfo, setRankInfo] = useState<ProjectRankType>();
  const { run: getRankInfo } = useRequest(
    async () => {
      const res = await webApi.resourceStationApi.getProjectsRankInfo(project.id);
      return res;
    },
    {
      onSuccess(res) {
        setRankInfo(res);
      }
    }
  );

  const { run: getHackathonInfo } = useRequest(
    async () => {
      const res = await webApi.resourceStationApi.getHackathonDetail(project.hackathonId);
      return res;
    },
    {
      onSuccess(res) {
        setHackathon(res);
      }
    }
  );
  const isShowVoting = useMemo(() => {
    const isEnd = dayjs().tz().isAfter(hackathon?.rewardTime);
    return !!(((isEnd && project.vote) || !isEnd) && project.isSubmit);
  }, [hackathon, project]);
  return (
    <div>
      <ProjectProvider isShowVoting={isShowVoting}>
        <CloseIn project={project} hackathon={hackathon as HackathonType} rankInfo={rankInfo as ProjectRankType} />
        <div className="p-[1.25rem]">
          <Content
            project={project}
            hackathon={hackathon as HackathonType}
            rankInfo={rankInfo as ProjectRankType}
            isShowVoting={isShowVoting}
          />
          <FeaturedProjects project={project} projectList={otherProjects} title={'projectsDetail.otherProjects'} />
        </div>
      </ProjectProvider>
    </div>
  );
};

export default ProjectDetail;
