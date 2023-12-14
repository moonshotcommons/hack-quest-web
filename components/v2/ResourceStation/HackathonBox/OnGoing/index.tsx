import React, { useState } from 'react';
import OnGoingHackathonCard from './OnGoingHackathonCard';
import {
  HackathonStatusType,
  HackathonType
} from '@/service/webApi/resourceStation/type';
import { useRequest } from 'ahooks';
import webApi from '@/service';
import { message } from 'antd';
import Loading from '@/components/v2/Common/Loading';
import NoData from './NoData';

interface OnGoingProp {
  goPast: VoidFunction;
}

const OnGoing: React.FC<OnGoingProp> = ({ goPast }) => {
  const { data: list = [], loading } = useRequest(
    async () => {
      const res = await webApi.resourceStationApi.getHackathonList({
        status: HackathonStatusType.ON_GOING
      });
      return res.data || [];
    },
    {
      onError(err: any) {
        const msg = err.msg || err.message;
        msg && message.error(msg);
      }
    }
  );
  return (
    <Loading loading={loading}>
      {!list.length ? (
        <NoData goPast={goPast} />
      ) : (
        <div className="text-[#0b0b0b] text-[14px]">
          {list.map((hackathon: HackathonType) => (
            <OnGoingHackathonCard hackathon={hackathon} key={hackathon.id} />
          ))}
        </div>
      )}
    </Loading>
  );
};

export default OnGoing;
