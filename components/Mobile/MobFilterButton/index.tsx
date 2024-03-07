import React from 'react';
import { TbAdjustmentsHorizontal } from 'react-icons/tb';

interface MobFilterButtonProp {
  onClick: VoidFunction;
}

const MobFilterButton: React.FC<MobFilterButtonProp> = ({ onClick }) => {
  return (
    <div
      className="button-text-s flex h-[2.125rem] items-center justify-center gap-[0.75rem] rounded-[1.0625rem] bg-yellow-primary"
      onClick={onClick}
    >
      <TbAdjustmentsHorizontal size={14} />
      <span>FILTERS</span>
    </div>
  );
};

export default MobFilterButton;
