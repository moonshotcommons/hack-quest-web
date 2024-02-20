import React from 'react';
import OnGoingHackathonCard from './OnGoingHackathonCard';
import {
  HackathonStatusType,
  HackathonType
} from '@/service/webApi/resourceStation/type';
import { useRequest } from 'ahooks';
import webApi from '@/service';
import { message } from 'antd';
import Loading from '@/components/Common/Loading';
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
        <div className="body-s text-neutral-black">
          {list.map((hackathon: HackathonType) => (
            <div key={hackathon.id} className="mb-[40px]">
              <OnGoingHackathonCard hackathon={hackathon} />
            </div>
          ))}
        </div>
      )}
    </Loading>
  );
};

export default OnGoing;
