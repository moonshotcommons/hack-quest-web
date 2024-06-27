import { HackathonType } from '@/service/webApi/resourceStation/type';
import React from 'react';
import DraftHackahtonCard from './DraftHackahtonCard';

interface DraftProp {
  hackathonList: HackathonType[];
}

const Draft: React.FC<DraftProp> = ({ hackathonList }) => {
  return (
    <div className="flex flex-col gap-[40px]">
      {hackathonList.map((hackathon) => (
        <div key={hackathon.id} className="w-full">
          <DraftHackahtonCard hackathon={hackathon} />
        </div>
      ))}
    </div>
  );
};

export default Draft;
