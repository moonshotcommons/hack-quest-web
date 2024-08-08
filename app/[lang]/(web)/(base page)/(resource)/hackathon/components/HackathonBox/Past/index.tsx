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
  isOrganizer?: boolean;
  showManage?: boolean;
}

const Past: FC<PastProps> = ({ page, hackathonList, total, limit, isOrganizer, showManage }) => {
  return (
    <div className="min-h-[80px] w-full">
      {hackathonList?.length > 0 && (
        <>
          <div className="flex w-full flex-wrap gap-x-[20px] gap-y-[40px]">
            {hackathonList.map((hackathon) => {
              return (
                <div key={hackathon.id} className="w-[calc((100%-60px)/4)]">
                  <PastHackathonCard
                    hackathon={hackathon}
                    isOrganizer={isOrganizer}
                    showManage={showManage}
                  ></PastHackathonCard>
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
        </>
      )}
    </div>
  );
};

export default Past;
