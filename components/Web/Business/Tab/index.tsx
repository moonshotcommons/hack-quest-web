import React from 'react';
import { ProcessType } from '@/service/webApi/course/type';
import { HackathonStatusType } from '@/service/webApi/resourceStation/type';
import { TabListType } from './type';
import { cn } from '@/helper/utils';
import { VscArrowRight } from 'react-icons/vsc';
import SlideHighlight from '@/components/Common/Navigation/SlideHighlight';

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
    <SlideHighlight
      className={cn(
        `flex gap-10 pb-[30px] leading-5 before:bottom-6`,
        className
      )}
      currentIndex={tabList.findIndex((v) => v.value === curTab)}
    >
      {tabList.map((tab: TabListType) => (
        <div
          key={tab.value}
          className={cn(
            `flex cursor-pointer items-center ${
              tab.value === curTab ? 'relative font-semibold' : ''
            }`,
            textClassName
          )}
          onClick={() => changeTab(tab)}
        >
          {tab.label}
          {tab.type === 'link' && <VscArrowRight />}
        </div>
      ))}
    </SlideHighlight>
  );
};

export default Tab;
