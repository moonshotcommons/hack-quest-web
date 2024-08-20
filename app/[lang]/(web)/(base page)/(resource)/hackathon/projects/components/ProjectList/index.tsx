import * as React from 'react';
import { ProjectType } from '@/service/webApi/resourceStation/type';
import ProjectCard from '@/components/Web/Business/ProjectCard';
import { Pagination } from '../Hackathon/Pagination';

export function ProjectList({ data, total }: { data: ProjectType[]; total: number }) {
  return (
    <React.Fragment>
      {total === 0 ? (
        <div className="flex w-full items-center justify-center py-20">
          <p>No data</p>
        </div>
      ) : (
        <div className="mb-8 mt-10 grid grid-cols-4 gap-x-5 gap-y-10">
          {data?.map((item) => <ProjectCard key={item.id} project={item} />)}
        </div>
      )}
      {total > 12 && <Pagination total={total} />}
    </React.Fragment>
  );
}
