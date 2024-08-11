import { FC } from 'react';
import webApi from '@/service';
import { PageLayout } from '@/components/hackathon/page-layout';
import { Lang, TransNs } from '@/i18n/config';
import MenuLink from '@/constants/MenuLink';
import { Metadata } from 'next';
import { useTranslation } from '@/i18n/server';
import { getHackathonsList } from '@/service/cach/resource/hackathon';
import { Tab } from './components/Tab';
import { FilterPanel } from './components/FilterPanel';
import { ProjectList } from './components/ProjectList';
import { HackathonList } from './components/HackathonList';

export interface SearchParamsType {
  keyword: string;
  sort: string;
  winner: boolean | string;
  tracks: string;
  track: string;
  prizeTrack: string;
  view?: string;
  page: string;
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

const Projects: FC<ProjectsProps> = async ({ params: { lang }, searchParams }) => {
  const { t } = await useTranslation(lang, TransNs.HACKATHON);
  const PROJECTS_LIMIT = 12;
  const offsetInt = parseInt(searchParams?.page ?? '1');
  const page = Number.isNaN(offsetInt) ? 1 : offsetInt;

  const pageInfo = {
    page,
    limit: PROJECTS_LIMIT
  };
  const params = {
    sort: searchParams.sort || '-createdAt',
    winner: searchParams.winner || '',
    tracks: searchParams.tracks || '',
    track: Array.isArray(searchParams.track) ? searchParams.track.join(',') : searchParams.track || '',
    prizeTrack: Array.isArray(searchParams.prizeTrack)
      ? searchParams.prizeTrack.join(',')
      : searchParams.prizeTrack || '',
    keyword: searchParams.keyword || ''
  };

  const view = searchParams?.view || 'project';

  const projects = await webApi.resourceStationApi.getProjectsList({
    ...pageInfo,
    ...params
  });

  const hackathons = await getHackathonsList({
    ...pageInfo,
    sort: params.sort || '-createdAt',
    track: params.track
  });

  return (
    <PageLayout lang={lang} slug="project_archive" title={t('project.title')} description={t('project.description')}>
      <div className="px-5 pt-10">
        <Tab currentTab={view} />
        <FilterPanel />
        {view === 'project' && <ProjectList {...projects} />}
        {view === 'hackathon' && <HackathonList {...hackathons} />}
      </div>
    </PageLayout>
  );
};

export default Projects;
