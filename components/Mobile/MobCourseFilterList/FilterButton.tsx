import React from 'react';
import { TbAdjustmentsHorizontal } from 'react-icons/tb';

interface MobFilterButtonProp {
  onClick: VoidFunction;
  count: number;
  isSelectFilter?: boolean;
}

const MobFilterButton: React.FC<MobFilterButtonProp> = ({
  onClick,
  count,
  isSelectFilter = false
}) => {
  return (
    <>
      <div
        className="flex items-center button-text-s h-[2.125rem] gap-[0.75rem] justify-center bg-yellow-primary rounded-[1.0625rem]"
        onClick={onClick}
      >
        {!isSelectFilter && <TbAdjustmentsHorizontal size={14} />}
        {isSelectFilter && (
          <div className="w-6 h-6 body-s-bold bg-neutral-off-black text-neutral-white flex items-center justify-center rounded-full">
            {count}
          </div>
        )}
        <span>FILTERS</span>
      </div>
    </>
  );
};

export default MobFilterButton;
