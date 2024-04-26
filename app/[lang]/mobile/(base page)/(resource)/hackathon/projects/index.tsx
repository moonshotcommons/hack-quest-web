import { FC } from 'react';
import ProjectsPage from './components';
import webApi from '@/service';
import { projectSort } from '@/app/[lang]/(web)/(base page)/(resource)/hackathon/constants/data';

export interface SearchParamsType {
  keyword: string;
  createdAt: string;
  winner: boolean | string;
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
    createdAt: searchParams.createdAt || projectSort[0].value,
    winner: searchParams.winner || '',
    tracks: searchParams.tracks || '',
    keyword: searchParams.keyword || ''
  };
  const project = await webApi.resourceStationApi.getProjectsList({
    ...pageInfo,
    ...params
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
