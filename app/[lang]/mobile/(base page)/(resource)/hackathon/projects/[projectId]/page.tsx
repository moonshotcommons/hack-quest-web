import { FC } from 'react';
import { Metadata } from 'next';
import { getHackathonProjectById, getOtherProjects } from '@/service/cach/resource/hackathon';
import { isUuid } from '@/helper/utils';
import { permanentRedirect } from 'next/navigation';
import MenuLink from '@/constants/MenuLink';
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

  const hackathon = await getHackathonProjectById(params.projectId);
  return {
    title: hackathon.name,
    description: hackathon.detail.detailedIntro,
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
  const { projectId, lang } = params;

  const [project] = await Promise.all([getHackathonProjectById(projectId)]);
  if (isUuid(projectId)) {
    permanentRedirect(`${MenuLink.PROJECTS}/${project.alias}`);
  }
  const otherProjects = await getOtherProjects(project.hackathonName, projectId);

  return <ProjectDetail project={project} otherProjects={otherProjects} />;
};

export default ProjectDetailPage;
