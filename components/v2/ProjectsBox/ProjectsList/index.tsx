import React from 'react';
import ProjectCard from '@/components/v2/ProjectCard';
import { CourseResponse } from '@/service/webApi/course/type';
import Link from 'next/link';

interface ProjectsListProps {
  list: CourseResponse[];
}
const ProjectsList: React.FC<ProjectsListProps> = ({ list }) => {
  return (
    <div className="flex-1 flex flex-wrap gap-[20px] pb-[20px]">
      {/* {list.map((project) => ( */}
      <Link href={'/resource-station/hackathon/projects/123'}>
        <ProjectCard project={{}}></ProjectCard>
      </Link>
      {/* ))} */}
    </div>
  );
};

export default ProjectsList;
