import React, { useEffect, useState } from 'react';
import PastHackathonCard from './PastHackathonCard';
import { useRequest } from 'ahooks';
import webApi from '@/service';

import { FC, ReactNode } from 'react';
import Loading from '@/components/v2/Common/Loading';
import { message } from 'antd';
import Pagination from '@/components/v2/Common/Pagination';
import { HackathonStatusType } from '@/service/webApi/resourceStation/hackathon/type';

interface PastProps {}

let PROJECTS_LIMIT = 9;

const Past: FC<PastProps> = (props) => {
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(20);

  const { run, loading } = useRequest(
    async () => {
      const res = await webApi.hackathon.getHackathonList({
        status: HackathonStatusType.PAST,
        page: page,
        limit: PROJECTS_LIMIT
      });
    },
    {
      manual: true,
      onSuccess() {},
      onError(err: any) {
        const msg = err.msg || err.message;
        msg && message.error(msg);
      }
    }
  );

  useEffect(() => {
    run();
  }, [page, run]);

  return (
    <Loading loading={loading}>
      <div className="flex w-full justify-between flex-wrap gap-y-[22px]">
        {new Array(9).fill('').map((item, index) => {
          return (
            <div key={index} className="w-[calc(33.33%-22px)]">
              <PastHackathonCard
                name="2023 Web 3 Hackathon Forum London + Day Party"
                starDate="Dec 8 - 10, 2023"
                address="Broadleaf, 25, Old Broad Street, EC2N 1HN, City of London"
              ></PastHackathonCard>
            </div>
          );
        })}
      </div>
      <div className="w-full flex justify-center pt-[50px]">
        {totalPage > PROJECTS_LIMIT && (
          <Pagination
            page={page}
            total={totalPage}
            onPageChange={(value) => {
              setPage(value);
            }}
          ></Pagination>
        )}
      </div>
    </Loading>
  );
};

export default Past;
