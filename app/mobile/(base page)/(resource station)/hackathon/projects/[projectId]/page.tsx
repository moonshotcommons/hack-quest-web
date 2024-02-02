'use client';
import { FC } from 'react';
import { useNeedPCRedirect } from '@/hooks/useNeedPCRedirect';

interface ProjectDetailPageProps {}

const ProjectDetailPage: FC<ProjectDetailPageProps> = (props) => {
  // const { projectId } = useParams();

  useNeedPCRedirect();

  return (
    <div>
      {/* <div className="container mx-auto">
        {projectId && (
          <ProjectDetail projectId={projectId as string}></ProjectDetail>
        )}
      </div>
      <div className="mt-[80px]">
        <FeaturedProjects
          ignoreProjectId={projectId as string}
        ></FeaturedProjects>
      </div> */}
    </div>
  );
};

export default ProjectDetailPage;
