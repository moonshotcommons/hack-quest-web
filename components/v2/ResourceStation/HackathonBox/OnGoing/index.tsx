import React from 'react';
import OnGoingHackathonCard from '@/components/v2/OnGoingHackathonCard';
import { HackathonType } from '@/service/webApi/resourceStation/hackathon/type';

interface OnGoingProp {
  list: HackathonType[];
}

const OnGoing: React.FC<OnGoingProp> = ({ list }) => {
  return (
    <div className="text-[#0b0b0b] text-[14px]">
      <OnGoingHackathonCard hackathon={{ id: '1' }} />
    </div>
  );
};

export default OnGoing;
