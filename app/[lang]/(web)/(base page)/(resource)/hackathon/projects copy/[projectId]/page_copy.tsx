import { FC } from 'react';
import { Metadata } from 'next';
import ProjectDetail from '../../components/ProjectDetail';
import FeaturedProjects from '../../components/FeaturedProject';
import { getFeaturedProjectsById, getHackathonProjectById, getOtherProjects } from '@/service/cach/resource/hackathon';

interface ProjectDetailPageProps {
  params: {
    projectId: string;
  };
}
export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const hackathon = await getHackathonProjectById(params.projectId);
  return {
    title: hackathon.name,
    description: hackathon.description
  };
}

const ProjectDetailPage: FC<ProjectDetailPageProps> = async ({ params }) => {
  const { projectId } = params;
  const [project, featuredProjects] = await Promise.all([
    getHackathonProjectById(projectId),
    getFeaturedProjectsById(projectId)
  ]);
  const otherProjects = await getOtherProjects(project.hackathonName, projectId);

  return (
    <div>
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
