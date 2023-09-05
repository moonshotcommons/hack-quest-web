import React from 'react';
import { courseTab, CourseTabType } from './type';
import { ProcessType } from '@/service/webApi/course/type';

interface TabType {
  curTab: ProcessType;
  changeTab: (tab: CourseTabType) => void;
}
const Tab: React.FC<TabType> = ({ curTab, changeTab }) => {
  return (
    <div className="flex gap-10 pb-[30px]">
      {courseTab.map((tab: CourseTabType) => (
        <div
          key={tab.value}
          className={`cursor-pointer h-[37px] text-[20px] border-b-[3px] leading-[44px]  border-[transparent] ${
            tab.value === curTab
              ? 'font-next-book-bold border-home-tab-border'
              : 'font-next-book'
          }`}
          onClick={() => changeTab(tab)}
        >
          {tab.label}
        </div>
      ))}
    </div>
  );
};

export default Tab;
