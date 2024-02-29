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
      className={`mb-[40px] flex gap-[30px] pb-[2px]`}
      type="LEARNING_TRACK"
      currentIndex={hackathonTab.findIndex((v) => v.value === curTab)}
    >
      {hackathonTab.map((v) => (
        <div
          key={v.value}
          onClick={() => {
            changeTab(v.value);
          }}
          className={`body-xl cursor-pointer  text-neutral-black ${
            curTab === v.value ? '  body-xl-bold ' : ' '
          }`}
        >
          {v.label}
        </div>
      ))}
    </SlideHighlight>
  );
};

export default Tab;
