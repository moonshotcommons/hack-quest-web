import React from 'react';
import { SearchInfoType } from '../type';
import { filterList } from '../data';

interface FilterProp {
  changeSearchInfo: (val: SearchInfoType) => void;
  searchInfo: SearchInfoType;
}

const Filter: React.FC<FilterProp> = ({ changeSearchInfo, searchInfo }) => {
  return (
    <div className="flex gap-[20px]">
      {filterList.map((v) => (
        <div
          key={v.value}
          onClick={() => changeSearchInfo({ ...searchInfo, filter: v.value })}
          className={`text-[18px] px-[24px] py-[8px] text-[#131313] leading-[28.8px] border rounded-[12px] cursor-pointer ${
            searchInfo.filter === v.value
              ? ' border-[#FFE866] font-bold bg-[#FFE866]'
              : ' border-[#3E3E3E]'
          }`}
        >
          {v.label}
        </div>
      ))}
    </div>
  );
};

export default Filter;
