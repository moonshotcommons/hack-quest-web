import React from 'react';
import { hackathonTab } from '../data';
import SlideHighlight from '@/components/Common/Navigation/SlideHighlight';
import { HackathonStatusType } from '@/service/webApi/resourceStation/type';

interface TabProp {
  curTab: HackathonStatusType;
  changeTab: (tab: HackathonStatusType) => void;
}

const Tab: React.FC<TabProp> = ({ curTab, changeTab }) => {
  return (
    <SlideHighlight
      className={`wapMin:gap-[.75rem] mb-[40px] flex gap-[1.875rem] pb-[2px]`}
      type="LEARNING_TRACK"
      currentIndex={hackathonTab.findIndex((v) => v.value === curTab)}
    >
      {hackathonTab.map((v) => (
        <div
          key={v.value}
          onClick={() => {
            changeTab(v.value);
          }}
          className={`body-l wapMin:body-m cursor-pointer  text-neutral-black ${
            curTab === v.value ? '  body-l-bold  wapMin:body-m-bold' : ' '
          }`}
        >
          {v.label}
        </div>
      ))}
    </SlideHighlight>
  );
};

export default Tab;
