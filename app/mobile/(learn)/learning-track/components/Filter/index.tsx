import React from 'react';
import { TbAdjustmentsHorizontal } from 'react-icons/tb';
import { SearchInfoType } from '../../constants/type';

interface FilterProp {
  changeSearchInfo: (val: SearchInfoType) => void;
  searchInfo: SearchInfoType;
}

const Filter: React.FC<FilterProp> = ({ changeSearchInfo, searchInfo }) => {
  return (
    <div className="">
      <div className="flex items-center text-h6-mob py-[0.625rem] gap-[0.75rem] justify-center bg-[var(--yellow-primary)] rounded-[1rem]">
        <TbAdjustmentsHorizontal size={14} />
        <span>FILTERS</span>
      </div>
    </div>
  );
};

export default Filter;
