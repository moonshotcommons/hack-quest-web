import React from 'react';
import { ProcessType } from '@/service/webApi/course/type';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import { TabListType, TabValueType } from './type';
import { cn } from '@/helper/utils';

interface TabType {
  tabList: TabListType[];
  curTab: ProcessType | HackathonType;
  changeTab: (tab: TabListType) => void;
  className?: string;
}
const Tab: React.FC<TabType> = ({ tabList, curTab, changeTab, className }) => {
  return (
    <div className={cn(`flex gap-10 pb-[30px] `, className)}>
      {tabList.map((tab: TabListType) => (
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
