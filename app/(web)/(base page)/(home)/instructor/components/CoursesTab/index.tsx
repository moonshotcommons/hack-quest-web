'use client';
import React from 'react';
import { CourseTab } from '../../constants/type';
import SlideHighlight from '@/components/Common/Navigation/SlideHighlight';
import Button from '@/components/Common/Button';
import { courseTab } from '../../constants/data';

interface CousesTabProp {
  curTab: CourseTab;
  changeTab: (val: CourseTab) => void;
}

const CousesTab: React.FC<CousesTabProp> = ({ curTab, changeTab }) => {
  return (
    <div className="mb-[32px] flex items-center justify-between">
      <SlideHighlight
        className={`flex gap-[30px] pb-[2px]`}
        type="LEARNING_TRACK"
        currentIndex={courseTab.findIndex((v) => v.value === curTab)}
      >
        {courseTab.map((v) => (
          <div
            key={v.value}
            onClick={() => changeTab(v.value as CourseTab)}
            className={`body-l cursor-pointer  text-neutral-black ${
              curTab === v.value ? '  body-l-bold ' : ' '
            }`}
          >
            {`${v.label} (${v.count})`}
          </div>
        ))}
      </SlideHighlight>
      <Button
        type="primary"
        className="button-text-m h-[48px] w-[165px] uppercase"
      >
        create new
      </Button>
    </div>
  );
};

export default CousesTab;
