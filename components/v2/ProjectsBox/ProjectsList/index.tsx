import React from 'react';
import ProjectCard from '@/components/v2/ProjectCard';
import { CourseResponse } from '@/service/webApi/course/type';

interface ProjectsListProps {
  list: CourseResponse[];
}
const ProjectsList: React.FC<ProjectsListProps> = ({ list }) => {
  return (
    <div className="flex-1 flex flex-wrap gap-[20px] pb-[20px]">
      {/* {list.map((project) => ( */}
      <ProjectCard project={{}}></ProjectCard>
      {/* ))} */}
    </div>
  );
};

export default ProjectsList;
