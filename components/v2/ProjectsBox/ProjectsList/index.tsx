import ProjectCard from '@/components/v2/Business/ProjectCard';
import { ProjectType } from '@/service/webApi/resourceStation/project/type';
import React from 'react';

interface ProjectsListProps {
  list: ProjectType[];
}
const ProjectsList: React.FC<ProjectsListProps> = ({ list }) => {
  return (
    <div className="flex-1 flex flex-wrap gap-[20px] pb-[20px] h-full">
      {list.map((project) => (
        <ProjectCard project={project} key={project.id}></ProjectCard>
      ))}
    </div>
  );
};

export default ProjectsList;
