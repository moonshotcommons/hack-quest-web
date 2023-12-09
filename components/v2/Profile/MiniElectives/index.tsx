import React from 'react';
import MiniElectiveCard from '../components/MiniElectiveCard';

interface MiniElectivesProp {}

const MiniElectives: React.FC<MiniElectivesProp> = () => {
  return (
    <div>
      <p className="text-[28px] text-[#000] font-next-poster-Bold mb-[30px] tracking-[1.68px]">
        Minis
      </p>
      <div className="flex flex-col gap-[30px]">
        <MiniElectiveCard />
        <MiniElectiveCard />
      </div>
    </div>
  );
};

export default MiniElectives;
