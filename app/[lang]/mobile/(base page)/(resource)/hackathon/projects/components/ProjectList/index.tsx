import * as React from 'react';
import { ProjectType } from '@/service/webApi/resourceStation/type';
import MobProjectCard from '@/components/Mobile/MobProjectCard';
import { Pagination } from '../Hackathon/Pagination';

export function ProjectList({ data, total }: { data: ProjectType[]; total: number }) {
  return (
    <React.Fragment>
      {total === 0 ? (
        <div className="flex w-full items-center justify-center py-20">
          <p>No data</p>
        </div>
      ) : (
        <div className="my-7 grid gap-y-4">{data?.map((item) => <MobProjectCard key={item.id} project={item} />)}</div>
      )}
      {total > 12 && <Pagination total={total} />}
    </React.Fragment>
  );
}
