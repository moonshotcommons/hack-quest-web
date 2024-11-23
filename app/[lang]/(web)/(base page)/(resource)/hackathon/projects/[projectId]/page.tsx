import { FC } from 'react';
import { Metadata } from 'next';
import {
  getHackathonById,
  getHackathonProjectById,
  getOtherProjects,
  getProjectVoteById
} from '@/service/cach/resource/hackathon';
import { isUuid } from '@/helper/utils';
import { permanentRedirect, redirect } from 'next/navigation';
import MenuLink from '@/constants/MenuLink';
import { Lang } from '@/i18n/config';
import ProjectDetail from './components';

export const dynamic = 'force-dynamic';

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

  // const project = await getHackathonProjectById(params.projectId);

  return {
    title: params.projectId,
    // description: project.detail?.oneLineIntro,
    alternates: {
      canonical: `https://www.hackquest.io${lang ? `/${lang}` : ''}/hackathon/projects/${params.projectId}/edit${query}`,
      languages: {
        'x-default': `https://www.hackquest.io/${Lang.EN}/hackathon/projects/${params.projectId}/edit${query}`,
        en: `https://www.hackquest.io/${Lang.EN}/hackathon/projects/${params.projectId}/edit${query}`,
        zh: `https://www.hackquest.io/${Lang.ZH}/hackathon/projects/${params.projectId}/edit${query}`
      }
    }
  };
}

const ProjectDetailPage: FC<ProjectDetailPageProps> = async ({ params }) => {
  try {
    const { projectId } = params;

    const project = await getHackathonProjectById(projectId);
    if (isUuid(projectId)) {
      permanentRedirect(`${MenuLink.PROJECTS}/${project.alias}`);
    }
    const [otherProjects, hackathon, projectVote] = await Promise.all([
      getOtherProjects(project.hackathonName, projectId),
      getHackathonById(project.hackathonId),
      getProjectVoteById(projectId)
    ]);
    return (
      <ProjectDetail project={project} otherProjects={otherProjects} hackathon={hackathon} projectVote={projectVote} />
    );
  } catch (err: any) {
    if (err.code === 401) {
      redirect('/');
    }
    throw new Error(err);
  }
};

export default ProjectDetailPage;
