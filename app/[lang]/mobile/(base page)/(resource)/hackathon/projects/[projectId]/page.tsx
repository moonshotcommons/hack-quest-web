import { FC } from 'react';
import { Metadata } from 'next';
import ProjectDetail from '../../components/ProjectDetail';
import { getFeaturedProjects, getHackathonProjectById, getOtherProjects } from '@/service/cach/resource/hackathon';
import { Lang } from '@/i18n/config';

interface ProjectDetailPageProps {
  params: {
    projectId: string;
    lang: string;
  };
}
export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const hackathon = await getHackathonProjectById(params.projectId);
  const { lang } = params;

  return {
    title: hackathon.name,
    description: hackathon.description,
    alternates: {
      canonical: `https://www.hackquest.io${lang ? `/${lang}` : ''}/hackathon/projects/${params.projectId}`,
      languages: {
        'x-default': `https://www.hackquest.io/${Lang.EN}/hackathon/projects/${params.projectId}`,
        en: `https://www.hackquest.io/${Lang.EN}/hackathon/projects/${params.projectId}`,
        zh: `https://www.hackquest.io/${Lang.ZH}/hackathon/projects/${params.projectId}`
      }
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
