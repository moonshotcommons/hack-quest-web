'use client';
import { useParams } from 'next/navigation';
import { FC } from 'react';
import ProjectDetail from '../../components/ProjectDetail';
import FeaturedProjects from '../../components/FeaturedProject';

interface ProjectDetailPageProps {}

const ProjectDetailPage: FC<ProjectDetailPageProps> = (props) => {
  const { projectId } = useParams();

  return (
    <div>
      <div className="container mx-auto">
        {projectId && (
          <ProjectDetail projectId={projectId as string}></ProjectDetail>
        )}
      </div>
      <div className="mt-[80px]">
        <FeaturedProjects
          ignoreProjectId={projectId as string}
        ></FeaturedProjects>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
