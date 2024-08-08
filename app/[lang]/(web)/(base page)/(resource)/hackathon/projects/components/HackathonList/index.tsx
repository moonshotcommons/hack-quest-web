import * as React from 'react';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import { Pagination } from '../Hackathon/Pagination';
import { HackathonCard } from '../HackathonCard';

export function HackathonList({ data, total }: { data: HackathonType[]; total: number }) {
  return (
    <React.Fragment>
      {total === 0 ? (
        <div className="flex w-full items-center justify-center py-20">
          <p>No data</p>
        </div>
      ) : (
        <div className="mb-10 mt-10 grid grid-cols-4 gap-x-5 gap-y-10">
          {data?.map((item) => <HackathonCard key={item.id} hackathon={item} />)}
        </div>
      )}
      {total > 12 && <Pagination total={total} />}
    </React.Fragment>
  );
}
