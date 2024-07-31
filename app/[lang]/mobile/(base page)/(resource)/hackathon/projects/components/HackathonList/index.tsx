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
        <div className="my-7 grid gap-4">{data?.map((item) => <HackathonCard key={item.id} hackathon={item} />)}</div>
      )}
      {total > 12 && <Pagination total={total} />}
    </React.Fragment>
  );
}
