'use client';
import { HackathonType, ProjectType, ProjectVotesType } from '@/service/webApi/resourceStation/type';
import React from 'react';
import Content from './Content';
import FeaturedProjects from '../../../components/FeaturedProject';
import CloseIn from './CloseIn';
import ProjectProvider from '@/app/[lang]/(web)/(base page)/(resource)/hackathon/projects/[projectId]/components/ProjectProvider';

interface ProjectDetailProp {
  project: ProjectType;
  otherProjects: ProjectType[];
  hackathon: HackathonType;
  projectVote: ProjectVotesType;
}

const ProjectDetail: React.FC<ProjectDetailProp> = ({ project, otherProjects, hackathon, projectVote }) => {
  return (
    <div>
      <ProjectProvider project={project} hackathon={hackathon} projectVote={projectVote}>
        <CloseIn />
        <div className="p-[1.25rem]">
          <Content />
          <FeaturedProjects project={project} projectList={otherProjects} title={'projectsDetail.otherProjects'} />
        </div>
      </ProjectProvider>
    </div>
  );
};

export default ProjectDetail;
