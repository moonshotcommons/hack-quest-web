import { FC } from 'react';
import { Metadata } from 'next';
import { Lang } from '@/i18n/config';
import Projects from './components';

export async function generateMetadata(props: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = props.params;

  return {
    title: 'Hackathons | HackQuest',
    alternates: {
      canonical: `https://www.hackquest.io${lang ? `/${lang}` : ''}/hackathon/projects`,
      languages: {
        'x-default': `https://www.hackquest.io/${Lang.EN}/hackathon/projects`,
        en: `https://www.hackquest.io/${Lang.EN}/hackathon/projects`,
        zh: `https://www.hackquest.io/${Lang.ZH}/hackathon/projects`
      }
    }
  };
}

interface ProjectsPageProps {}

const ProjectsPage: FC<ProjectsPageProps> = (props) => {
  return <Projects />;
};

export default ProjectsPage;
