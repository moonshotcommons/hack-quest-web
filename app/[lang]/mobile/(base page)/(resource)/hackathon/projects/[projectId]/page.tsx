import { FC } from 'react';
import { Metadata } from 'next';
import ProjectDetail from '../../components/ProjectDetail';
import { getFeaturedProjects, getHackathonProjectById, getOtherProjects } from '@/service/cach/resource/hackathon';

interface ProjectDetailPageProps {
  params: {
    projectId: string;
  };
}
export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const hackathon = await getHackathonProjectById(params.projectId);
  return {
    title: hackathon.name,
    description: hackathon.description,
    alternates: {
      canonical: `https://www.hackquest.io/hackathon/projects/${params.projectId}`
    }
  };
}

const ProjectDetailPage: FC<ProjectDetailPageProps> = async ({ params }) => {
  const { projectId } = params;
  const [project, featuredProjects] = await Promise.all([getHackathonProjectById(projectId), getFeaturedProjects()]);
  const otherProjects = await getOtherProjects(project.hackathonName, projectId);

  return (
    <div className="container mx-auto">
      <ProjectDetail />
    </div>
  );
};

export default ProjectDetailPage;
