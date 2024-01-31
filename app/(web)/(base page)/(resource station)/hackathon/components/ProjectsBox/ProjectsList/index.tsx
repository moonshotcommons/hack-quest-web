import ProjectCard from '@/components/Web/Business/ProjectCard';
import { ProjectType } from '@/service/webApi/resourceStation/type';
import React from 'react';

interface ProjectsListProps {
  list: ProjectType[];
}
const ProjectsList: React.FC<ProjectsListProps> = ({ list }) => {
  return (
    <div className="flex h-full flex-1 flex-wrap gap-[20px] pb-[20px]">
      {list.map((project) => (
        <ProjectCard project={project} key={project.id}></ProjectCard>
      ))}
    </div>
  );
};

export default ProjectsList;
