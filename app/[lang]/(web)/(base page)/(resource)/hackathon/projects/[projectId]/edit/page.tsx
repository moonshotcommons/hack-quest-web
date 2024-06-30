import { FC } from 'react';
import { Metadata } from 'next';
import { getHackathonById, getHackathonProjectById } from '@/service/cach/resource/hackathon';
import { Lang } from '@/i18n/config';
import ProjectDetail from './components';

interface ProjectDetailPageProps {
  params: {
    projectId: string;
    lang: Lang;
  };
  searchParams: Record<string, string>;
}
export async function generateMetadata({ params, searchParams }: ProjectDetailPageProps): Promise<Metadata> {
  let query = new URLSearchParams(searchParams).toString();
  query = query ? '?' + query : '';

  const { lang } = params;

  const project = await getHackathonProjectById(params.projectId);
  return {
    title: project.name,
    description: project.detail.detailedIntro,
    alternates: {
      canonical: `https://www.hackquest.io${lang ? `/${lang}` : ''}/hackathon/projects/${params.projectId}${query}`,
      languages: {
        'x-default': `https://www.hackquest.io/${Lang.EN}/hackathon/projects/${params.projectId}${query}`,
        en: `https://www.hackquest.io/${Lang.EN}/hackathon/projects/${params.projectId}${query}`,
        zh: `https://www.hackquest.io/${Lang.ZH}/hackathon/projects/${params.projectId}${query}`
      }
    }
  };
}

const ProjectDetailPage: FC<ProjectDetailPageProps> = async ({ params }) => {
  const { projectId } = params;

  const [project] = await Promise.all([getHackathonProjectById(projectId)]);
  const hackathon = await getHackathonById(project.hackathonId);

  return <ProjectDetail project={project} hackathon={hackathon} />;
};

export default ProjectDetailPage;
