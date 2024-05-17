'use client';
import { ProjectType } from '@/service/webApi/resourceStation/type';
import React from 'react';
import Content from './Content';
import ProjectProvider from '@/app/[lang]/(web)/(base page)/(resource)/hackathon/projects/[projectId]/components/ProjectProvider';

interface ProjectDetailProp {
  project: ProjectType;
}

const ProjectDetail: React.FC<ProjectDetailProp> = ({ project }) => {
  return (
    <div>
      {/* <CloseIn project={project} /> */}
      <div className="p-[1.25rem]">
        <ProjectProvider project={project}>
          <Content project={project} />
        </ProjectProvider>
      </div>
    </div>
  );
};

export default ProjectDetail;
