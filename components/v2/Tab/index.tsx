import React from 'react';
import { ProcessType } from '@/service/webApi/course/type';
import { HackathonStatusType } from '@/service/webApi/resourceStation/hackathon/type';
import { TabListType } from './type';
import { cn } from '@/helper/utils';
import { VscArrowRight } from 'react-icons/vsc';

interface TabType {
  tabList: TabListType[];
  curTab: ProcessType | HackathonStatusType;
  changeTab: (tab: TabListType) => void;
  className?: string;
  textClassName?: string;
}
const Tab: React.FC<TabType> = ({
  tabList,
  curTab,
  changeTab,
  className,
  textClassName
}) => {
  return (
    <div
      className={cn(
        `flex gap-10 pb-[30px] text-[20px] leading-[20px]`,
        className
      )}
    >
      {tabList.map((tab: TabListType) => (
        <div
          key={tab.value}
          className={cn(
            `cursor-pointer flex items-center  border-b-[3px]  border-[transparent] ${
              tab.value === curTab
                ? 'font-next-book-bold border-home-tab-border'
                : 'font-next-book'
            }`,
            textClassName
          )}
          onClick={() => changeTab(tab)}
        >
          {tab.label}
          {tab.type === 'link' && <VscArrowRight />}
        </div>
      ))}
    </div>
  );
};

export default Tab;
