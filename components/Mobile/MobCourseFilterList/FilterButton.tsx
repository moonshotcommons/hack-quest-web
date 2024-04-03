import React from 'react';
import { TbAdjustmentsHorizontal } from 'react-icons/tb';

interface MobFilterButtonProp {
  onClick: VoidFunction;
  count: number;
  isSelectFilter?: boolean;
}

const MobFilterButton: React.FC<MobFilterButtonProp> = ({ onClick, count, isSelectFilter = false }) => {
  return (
    <>
      <div
        className="button-text-s flex h-[2.125rem] items-center justify-center gap-[0.75rem] rounded-[1.0625rem] bg-yellow-primary"
        onClick={onClick}
      >
        {!isSelectFilter && <TbAdjustmentsHorizontal size={14} />}
        {isSelectFilter && (
          <div className="body-s-bold flex h-6 w-6 items-center justify-center rounded-full bg-neutral-off-black text-neutral-white">
            {count}
          </div>
        )}
        <span>FILTERS</span>
      </div>
    </>
  );
};

export default MobFilterButton;
