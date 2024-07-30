import { FC } from 'react';
import webApi from '@/service';
import { projectSort } from '../constants/data';
import { PageLayout } from '@/components/hackathon/page-layout';
import ProjectCard from '@/components/Web/Business/ProjectCard';
import { Lang, TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/server';
import { Metadata } from 'next';
import MenuLink from '@/constants/MenuLink';
import { Tab } from './components/Tab';
import { FilterPanel } from './components/FilterPanel';
import { getHackathonsList } from '@/service/cach/resource/hackathon';
import PastHackathonCard from '../components/HackathonBox/Past/PastHackathonCard';

export interface SearchParamsType {
  keyword: string;
  createdAt: string;
  winner: boolean | string;
  tracks: string;
  track: string;
  prizeTrack: string;
  view?: string;
}
export interface PageInfoType {
  page: number;
  limit: number;
}
interface ProjectsProps {
  params: { slug: string[]; lang: Lang };
  searchParams: SearchParamsType;
}

export async function generateMetadata(props: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = props.params;

  return {
    title: 'HackQuest',
    alternates: {
      canonical: `https://www.hackquest.io${lang ? `/${lang}` : ''}${MenuLink.PROJECTS}`,
      languages: {
        'x-default': `https://www.hackquest.io/${Lang.EN}${MenuLink.PROJECTS}`,
        en: `https://www.hackquest.io/${Lang.EN}${MenuLink.PROJECTS}`,
        zh: `https://www.hackquest.io/${Lang.ZH}${MenuLink.PROJECTS}`
      }
    }
  };
}

const Projects: FC<ProjectsProps> = async ({ params: { slug = [], lang }, searchParams }) => {
  const { t } = await useTranslation(lang, TransNs.HACKATHON);
  const PROJECTS_LIMIT = 12;
  const minPage = Number(slug[1]) < 1 ? 1 : Number(slug[1]);
  const pageInfo = {
    page: slug[0] === 'p' ? minPage : 1,
    limit: PROJECTS_LIMIT
  };
  const params = {
    createdAt: searchParams.createdAt || projectSort[0].value,
    winner: searchParams.winner || '',
    tracks: searchParams.tracks || '',
    track: Array.isArray(searchParams.track) ? searchParams.track.join(',') : searchParams.track || '',
    prizeTrack: Array.isArray(searchParams.prizeTrack)
      ? searchParams.prizeTrack.join(',')
      : searchParams.prizeTrack || '',
    keyword: searchParams.keyword || ''
  };

  const view = searchParams?.view || 'project';

  const project = await webApi.resourceStationApi.getProjectsList({
    ...pageInfo,
    ...params
  });

  const hackathons = await getHackathonsList({});

  return (
    <PageLayout lang={lang} slug="project_archive" title={t('project.title')} description={t('project.description')}>
      <div>
        <Tab currentTab={view} />
        <FilterPanel />
        {view === 'project' && (
          <div className="mt-10 grid grid-cols-4 gap-x-5 gap-y-10">
            {project.data?.map((item) => <ProjectCard key={item.id} project={item} />)}
          </div>
        )}
        {view === 'hackathon' && (
          <div className="mt-10 grid grid-cols-4 gap-x-5 gap-y-10">
            {hackathons.data?.map((item) => <PastHackathonCard key={item.id} hackathon={item} />)}
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default Projects;
