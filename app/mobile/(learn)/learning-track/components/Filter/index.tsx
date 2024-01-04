import React from 'react';

import { SearchInfoType } from '../../constants/type';
import MobFilterButton from '@/components/Mobile/MobFilterButton';

interface FilterProp {
  changeSearchInfo: (val: SearchInfoType) => void;
  searchInfo: SearchInfoType;
}

const Filter: React.FC<FilterProp> = ({ changeSearchInfo, searchInfo }) => {
  const handleFilter = () => {
    console.info(11);
  };
  return (
    <div className="">
      <MobFilterButton onClick={handleFilter} />
    </div>
  );
};

export default Filter;
