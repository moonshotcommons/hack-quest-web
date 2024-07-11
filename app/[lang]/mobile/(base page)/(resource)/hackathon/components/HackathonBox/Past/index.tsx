import React from 'react';
import PastHackathonCard from './PastHackathonCard';

import { FC } from 'react';
import Pagination from '@/components/Common/Pagination';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import MenuLink from '@/constants/MenuLink';

interface PastProps {
  page: number;
  hackathonList: HackathonType[];
  total: number;
  limit: number;
}

const Past: FC<PastProps> = ({ page, hackathonList, total, limit }) => {
  // const [page, setPage] = useState(1);

  return (
    <div className="min-h-[5rem]">
      <div className="flex flex-col gap-[1.25rem]">
        {hackathonList?.map((hackathon) => {
          return (
            <div key={hackathon.id} className="w-full">
              <PastHackathonCard hackathon={hackathon}></PastHackathonCard>
            </div>
          );
        })}
      </div>
      <div className="flex w-full justify-center pt-[50px]">
        {total > limit && (
          <Pagination
            page={page}
            total={Math.ceil(total / limit)}
            urlPrefix={`${MenuLink.EXPLORE_HACKATHON}/p/`}
          ></Pagination>
        )}
      </div>
    </div>
  );
};

export default Past;
