import { FC } from 'react';
import ProjectsPage from './components';
import webApi from '@/service';

export interface SearchParamsType {
  keyword: string;
  sort: string;
  apolloDay: boolean | string;
  tracks: string;
}
export interface PageInfoType {
  page: number;
  limit: number;
}
interface ProjectsProps {
  params: { slug: string[] };
  searchParams: SearchParamsType;
}

const Projects: FC<ProjectsProps> = async ({ params: { slug = [] }, searchParams }) => {
  const PROJECTS_LIMIT = 12;
  const minPage = Number(slug[1]) < 1 ? 1 : Number(slug[1]);
  const pageInfo = {
    page: slug[0] === 'p' ? minPage : 1,
    limit: PROJECTS_LIMIT
  };
  const params = {
    sort: searchParams.sort || '',
    apolloDay: searchParams.apolloDay || '',
    tracks: searchParams.tracks || '',
    keyword: searchParams.keyword || ''
  };
  const project = await webApi.resourceStationApi.getProjectsList({
    ...pageInfo,
    ...params,
    sort: searchParams.sort || '-featured'
  });
  return (
    <ProjectsPage
      list={project.data}
      pageInfo={pageInfo}
      searchParams={params as SearchParamsType}
      total={project.total}
    />
  );
};

export default Projects;
