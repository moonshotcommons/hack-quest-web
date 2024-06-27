import React from 'react';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import EditBox from '../EditBox';

interface RewardsProjectsProp {
  hackathon: HackathonType;
}

const RewardsProjects: React.FC<RewardsProjectsProp> = ({ hackathon }) => {
  return (
    <EditBox title={'hackathonDetail.rewardsAndProjects'} className="border-none bg-transparent p-0">
      <div className="flex flex-col gap-[40px]"></div>
    </EditBox>
  );
};

export default RewardsProjects;
