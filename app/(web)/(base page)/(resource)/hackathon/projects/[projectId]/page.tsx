import { FC } from 'react';
import { Metadata } from 'next';
import ProjectDetail from '../../components/ProjectDetail';
import FeaturedProjects from '../../components/FeaturedProject';
import {
  getFeaturedProjectsById,
  getHackathonProjectById,
  getOtherProjects
} from '@/service/catch/resource/hackathon';
import { isUuid } from '@/helper/utils';
import { permanentRedirect } from 'next/navigation';
import { MenuLink } from '@/components/Web/Layout/BasePage/Navbar/type';

interface ProjectDetailPageProps {
  params: {
    projectId: string;
  };
  searchParams: Record<string, string>;
}
export async function generateMetadata({
  params,
  searchParams
}: ProjectDetailPageProps): Promise<Metadata> {
  let query = new URLSearchParams(searchParams).toString();
  query = query ? '?' + query : '';
  const hackathon = await getHackathonProjectById(params.projectId);
  return {
    title: hackathon.name,
    description: hackathon.description,
    alternates: {
      canonical: `https://www.hackquest.io/hackathon/projects/${params.projectId}${query}`
    }
  };
}

const ProjectDetailPage: FC<ProjectDetailPageProps> = async ({ params }) => {
  const { projectId } = params;
  const [project, featuredProjects] = await Promise.all([
    getHackathonProjectById(projectId),
    getFeaturedProjectsById(projectId)
  ]);
  if (isUuid(projectId)) {
    permanentRedirect(`${MenuLink.PROJECTS}/${project.alias}`);
  }
  const otherProjects = await getOtherProjects(
    project.hackathonName,
    projectId
  );

  return (
    <div className="pt-[40px]">
      <div className="container mx-auto">
        <ProjectDetail project={project} others={otherProjects} />
      </div>
      <div className="mt-[80px]">
        <FeaturedProjects projectList={featuredProjects}></FeaturedProjects>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
