'use client';
import React from 'react';
import { LearningTrackTab, SearchInfoType } from '../../constants/type';
import { filterList } from '../../constants/data';
import SlideHighlight from '@/components/Common/Navigation/SlideHighlight';
import { getSearchParamsUrl } from '@/helper/utils';
import MenuLink from '@/constants/MenuLink';
import Link from 'next/link';

interface FilterProp {
  searchInfo: SearchInfoType;
}

const Filter: React.FC<FilterProp> = ({ searchInfo }) => {
  const getSearchInfo = (info: SearchInfoType) => {
    const param = {
      ...info,
      track: info.track === LearningTrackTab.BASIC ? '' : info.track
    };
    return getSearchParamsUrl(param, MenuLink.LEARNING_TRACK);
  };
  return (
    <SlideHighlight
      className={`flex gap-[30px] pb-[2px]`}
      type="LEARNING_TRACK"
      currentIndex={filterList.findIndex((v) => v.value === searchInfo.language)}
    >
      {filterList.map((v) => (
        <Link key={v.value} href={getSearchInfo({ ...searchInfo, language: v.value })}>
          <div className={`body-l cursor-pointer  text-neutral-black ${searchInfo.language === v.value ? '  body-l-bold ' : ' '}`}>
            {v.label}
          </div>
        </Link>
      ))}
    </SlideHighlight>
  );
};

export default Filter;
