import React, { useEffect } from 'react';
import PastHackathonCard from './PastHackathonCard';
import { useRequest } from 'ahooks';
import webApi from '@/service';

import { FC, ReactNode } from 'react';
import Loading from '@/components/v2/Common/Loading';
import { message } from 'antd';

interface PastProps {}

const Past: FC<PastProps> = (props) => {
  const { run, loading } = useRequest(
    async () => {
      const res = await webApi.hackathon.getPastHackathon({
        page: 1,
        limit: 10
      });
    },
    {
      onSuccess() {},
      onError(err: any) {
        const msg = err.msg || err.message;
        msg && message.error(msg);
      }
    }
  );

  return (
    <Loading loading={loading}>
      <div className="flex w-full justify-between flex-wrap gap-y-[22px]">
        {new Array(6).fill('').map((item, index) => {
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
    </Loading>
  );
};

export default Past;
