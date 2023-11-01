import Pagination from '@/components/v2/Common/Pagination';
import ProjectCard from '@/components/v2/ProjectCard';
import FeatureProjects from '@/components/v2/ResourceStation/FeaturedProject';
import ProjectDetail from '@/components/v2/ResourceStation/ProjectDetail';
import { useRequest } from 'ahooks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, ReactNode, useEffect } from 'react';

interface ProjectDetailPageProps {}

const ProjectDetailPage: FC<ProjectDetailPageProps> = (props) => {
  const router = useRouter();
  const { projectId } = router.query;

  return (
    <div>
      <div className="container mx-auto ">
        {projectId && (
          <ProjectDetail projectId={projectId as string}></ProjectDetail>
        )}
      </div>
      <div className="mt-[80px]">
        <FeatureProjects></FeatureProjects>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
