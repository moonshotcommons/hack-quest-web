import SearchFilter from '@/components/Web/Business/SearchFilter/seo';
import { dealFilterParam } from '@/components/Web/Business/SearchFilter';
import {
  FilterDataType,
  FilterType
} from '@/components/Web/Business/SearchFilter/type';
import webApi from '@/service';
import React from 'react';
import ProjectsList from './ProjectsList';
import Pagination from '@/components/Common/Pagination';

interface PageInfoType {
  page: number;
  limit: number;
}
interface ProjectsBoxProps {
  page: number;
  searchParams: { keyword: string } & Record<string, string>;
}
const ProjectsBox: React.FC<ProjectsBoxProps> = async ({
  searchParams,
  page
}) => {
  const limit = 12;
  const { keyword, ...filter } = searchParams;

  const newFilter = Object.entries(filter).reduce((acc, [key, value]) => {
    acc.push({
      type: key as FilterType,
      title: '',
      value: value as string,
      filterList: []
    });
    return acc;
  }, [] as FilterDataType[]);
  const res = await webApi.resourceStationApi.getProjectsList({
    ...dealFilterParam(newFilter),
    keyword,
    page,
    limit
  });
  const { total, data: list } = res;

  return (
    <div className="flex justify-between gap-10 h-full">
      <SearchFilter searchParams={searchParams} />
      <div className="flex-1 pb-5 h-full">
        <ProjectsList list={list} />
        <Pagination
          total={total}
          page={page}
          urlPrefix="/hackathon/projects/p/"
        />
      </div>
    </div>
  );
};

export default ProjectsBox;
