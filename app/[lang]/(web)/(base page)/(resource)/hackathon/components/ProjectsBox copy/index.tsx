import React from 'react';
import { ProjectType } from '@/service/webApi/resourceStation/type';
import ProjectsList from './ProjectsList';
import SearchFilter from '@/components/Web/Business/SearchFilter/seo';
import Pagination from '@/components/Common/Pagination';
import { filterData } from '../../components/ProjectsBox/data';
import { deepClone } from '@/helper/utils';

interface ProjectsBoxProps {
  page: number;
  total: number;
  list: ProjectType[];
  searchParams: { keyword: string } & Record<string, string>;
}
const ProjectsBox: React.FC<ProjectsBoxProps> = ({ page, total, list, searchParams }) => {
  return (
    <div className="flex h-full justify-between gap-10">
      <SearchFilter searchParams={searchParams} filterData={deepClone(filterData)} urlPrefix="/hackathon/projects/" />
      <div className="h-full flex-1 pb-5">
        <ProjectsList list={list} />
        <Pagination total={total} page={page} urlPrefix="/hackathon/projects/p/" />
      </div>
    </div>
  );
};

export default ProjectsBox;
