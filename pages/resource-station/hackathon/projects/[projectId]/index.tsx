import Pagination from '@/components/v2/Common/Pagination';
import ProjectCard from '@/components/v2/ProjectCard';
import FeatureProjects from '@/components/v2/ResourceStation/FeaturedProject';
import ProjectDetail from '@/components/v2/ResourceStation/ProjectDetail';
import Link from 'next/link';
import { FC, ReactNode } from 'react';

interface ProjectDetailPageProps {}

const ProjectDetailPage: FC<ProjectDetailPageProps> = (props) => {
  return (
    <div>
      <div className="container mx-auto ">
        <ProjectDetail></ProjectDetail>
      </div>
      <div className="mt-[80px]">
        <FeatureProjects></FeatureProjects>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
