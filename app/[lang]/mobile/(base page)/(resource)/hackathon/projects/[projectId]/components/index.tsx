'use client';
import { ProjectType } from '@/service/webApi/resourceStation/type';
import React from 'react';
import Content from './Content';

interface ProjectDetailProp {
  project: ProjectType;
}

const ProjectDetail: React.FC<ProjectDetailProp> = ({ project }) => {
  return (
    <div>
      {/* <CloseIn project={project} /> */}
      <div className="p-[1.25rem]">
        <Content project={project} />
      </div>
    </div>
  );
};

export default ProjectDetail;
