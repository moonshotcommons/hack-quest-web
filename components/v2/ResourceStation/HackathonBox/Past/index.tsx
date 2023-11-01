import React, { useEffect, useState } from 'react';
import PastHackathonCard from './PastHackathonCard';
import { useRequest } from 'ahooks';
import webApi from '@/service';

import { FC, ReactNode } from 'react';
import Loading from '@/components/v2/Common/Loading';
import { message } from 'antd';
import Pagination from '@/components/v2/Common/Pagination';
import {
  HackathonStatusType,
  HackathonType
} from '@/service/webApi/resourceStation/hackathon/type';

interface PastProps {}

let PROJECTS_LIMIT = 9;

const Past: FC<PastProps> = (props) => {
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [hackathonList, setHackathonList] = useState<HackathonType[]>([]);

  const { run, loading } = useRequest(
    async () => {
      const res = await webApi.hackathon.getHackathonList({
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
        {hackathonList.map((item, index) => {
          return (
            <div key={index} className="w-[calc(33.33%-22px)]">
              <PastHackathonCard
                name={item.name}
                starDate={item.startTime}
                endDate={item.endTime}
                address={item.address}
                cover={item.image}
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
