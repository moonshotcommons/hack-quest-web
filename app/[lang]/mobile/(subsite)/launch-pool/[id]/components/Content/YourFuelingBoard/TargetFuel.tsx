import React from 'react';
import TargetCard from './TargetCard';

interface TargetFuelProp {}

const TargetFuel: React.FC<TargetFuelProp> = () => {
  return (
    <div className="mt-[24px]">
      <p className="body-l text-neutral-black">Target Fuel</p>
      <div className="mt-[16px]">
        <TargetCard />
      </div>
    </div>
  );
};

export default TargetFuel;
