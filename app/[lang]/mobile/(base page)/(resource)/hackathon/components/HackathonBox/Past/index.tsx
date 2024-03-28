import React, { useEffect, useState } from 'react';
import PastHackathonCard from './PastHackathonCard';
import { useRequest } from 'ahooks';
import webApi from '@/service';

import { FC } from 'react';
import Loading from '@/components/Common/Loading';
import Pagination from '@/components/Common/Pagination';
import {
  HackathonStatusType,
  HackathonType
} from '@/service/webApi/resourceStation/type';
import { errorMessage } from '@/helper/ui';
import MenuLink from '@/constants/MenuLink';

interface PastProps {
  page: number;
}

let PROJECTS_LIMIT = 12;

const Past: FC<PastProps> = ({ page }) => {
  // const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [hackathonList, setHackathonList] = useState<HackathonType[]>([]);

  const { run, loading } = useRequest(
    async () => {
      const res = await webApi.resourceStationApi.getHackathonList({
        status: HackathonStatusType.PAST,
        page: page,
        limit: PROJECTS_LIMIT
      });
      return res;
    },
    {
      manual: true,
      onSuccess(res) {
        const { data, total } = res;
        setTotalPage(total);
        setHackathonList(data);
      },
      onError(err: any) {
        errorMessage(err);
      }
    }
  );

  useEffect(() => {
    run();
  }, [page, run]);

  return (
    <Loading loading={loading}>
      <div className="flex w-full flex-col gap-y-[1rem]">
        {hackathonList.map((hackathon) => {
          return (
            <div key={hackathon.id}>
              <PastHackathonCard hackathon={hackathon}></PastHackathonCard>
            </div>
          );
        })}
      </div>
      <div className="flex w-full justify-center pt-[50px]">
        {totalPage > PROJECTS_LIMIT && (
          <Pagination
            page={page}
            total={Math.ceil(totalPage / PROJECTS_LIMIT)}
            urlPrefix={`${MenuLink.HACKATHON}/p/`}
          ></Pagination>
        )}
      </div>
    </Loading>
  );
};

export default Past;
