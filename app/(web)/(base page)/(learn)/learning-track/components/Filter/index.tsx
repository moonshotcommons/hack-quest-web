import React from 'react';
import { SearchInfoType } from '../../constants/type';
import { filterList } from '../../constants/data';

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
          onClick={() => changeSearchInfo({ ...searchInfo, language: v.value })}
          className={`body-l px-[24px] py-[8px] text-[var(--neutral-off-black)]  border rounded-[12px] cursor-pointer ${
            searchInfo.language === v.value
              ? ' border-[var(--yellow-primary)] font-bold bg-[var(--yellow-primary)]'
              : ' border-[var(--neutral-rich-gray)]'
          }`}
        >
          {v.label}
        </div>
      ))}
    </div>
  );
};

export default Filter;
