import React from 'react';
import ProjectCard from '@/components/v2/ProjectCard';
import { ProjectType } from '@/service/webApi/resourceStation/project/type';

interface ProjectsListProps {
  list: ProjectType[];
}
const ProjectsList: React.FC<ProjectsListProps> = ({ list }) => {
  return (
    <div className="flex-1 flex flex-wrap gap-[20px] pb-[20px]">
      {list.map((project) => (
        <ProjectCard project={project} key={project.id}></ProjectCard>
      ))}
    </div>
  );
};

export default ProjectsList;
