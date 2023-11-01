import React, { useState } from 'react';
import OnGoingHackathonCard from '@/components/v2/OnGoingHackathonCard';
import {
  HackathonStatusType,
  HackathonType,
  acquiescePageInfo
} from '@/service/webApi/resourceStation/hackathon/type';
import { useRequest } from 'ahooks';
import webApi from '@/service';

interface OnGoingProp {}

const OnGoing: React.FC<OnGoingProp> = () => {
  const { data: list = [] } = useRequest(async () => {
    const res = await webApi.hackathon.getHackathonList({
      status: HackathonStatusType.ON_GOING
    });
    return res.data || [];
  });
  return (
    <div className="text-[#0b0b0b] text-[14px]">
      {list.map((hackathon: HackathonType) => (
        <OnGoingHackathonCard hackathon={hackathon} key={hackathon.id} />
      ))}
    </div>
  );
};

export default OnGoing;
