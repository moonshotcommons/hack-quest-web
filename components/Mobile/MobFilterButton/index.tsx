import React from 'react';
import { TbAdjustmentsHorizontal } from 'react-icons/tb';

interface MobFilterButtonProp {
  onClick: VoidFunction;
}

const MobFilterButton: React.FC<MobFilterButtonProp> = ({ onClick }) => {
  return (
    <div
      className="flex items-center button-text-s h-[2.125rem] gap-[0.75rem] justify-center bg-yellow-primary rounded-[1.0625rem]"
      onClick={onClick}
    >
      <TbAdjustmentsHorizontal size={14} />
      <span>FILTERS</span>
    </div>
  );
};

export default MobFilterButton;
