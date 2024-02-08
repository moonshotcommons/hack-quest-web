'use client';
import React from 'react';
import { SearchInfoType } from '../../constants/type';
import { filterList } from '../../constants/data';
import SlideHighlight from '@/components/Common/Navigation/SlideHighlight';
import { useRouter } from 'next/navigation';

interface FilterProp {
  changeSearchInfo: (val: SearchInfoType) => void;
  searchInfo: SearchInfoType;
}

const Filter: React.FC<FilterProp> = ({ searchInfo, changeSearchInfo }) => {
  const router = useRouter();
  return (
    <SlideHighlight
      className={`flex gap-[30px] pb-[2px]`}
      type="LEARNING_TRACK"
      currentIndex={filterList.findIndex(
        (v) => v.value === searchInfo.language
      )}
    >
      {filterList.map((v) => (
        <div
          key={v.value}
          onClick={() => {
            changeSearchInfo({ ...searchInfo, language: v.value });
          }}
          className={`body-l cursor-pointer  text-neutral-black ${
            searchInfo.language === v.value ? '  body-l-bold ' : ' '
          }`}
        >
          {v.label}
        </div>
      ))}
    </SlideHighlight>
  );
};

export default Filter;
