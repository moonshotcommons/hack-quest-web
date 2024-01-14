import ProjectCard from '@/components/Web/Business/ProjectCard';
import { ProjectType } from '@/service/webApi/resourceStation/type';
import React from 'react';

interface ProjectsListProps {
  list: ProjectType[];
}
const ProjectsList: React.FC<ProjectsListProps> = ({ list }) => {
  return (
    <div className="flex flex-wrap gap-5 mb-5">
      {list.map((project) => (
        <ProjectCard project={project} key={project.id}></ProjectCard>
      ))}
    </div>
  );
};

export default ProjectsList;
