import SlideHighlight from '@/components/Common/Navigation/SlideHighlight';
import React from 'react';
import { AuditTabType } from '../../../../constants/type';
import { separationNumber } from '@/helper/utils';

interface TabProp {
  curTab: any;
  changeTab: (tab: any) => void;
  tabs: AuditTabType[];
  disable?: boolean;
}

const Tab: React.FC<TabProp> = ({ changeTab, curTab, tabs, disable }) => {
  return (
    <SlideHighlight
      className={`flex gap-[30px] pb-[2px]`}
      type="LEARNING_TRACK"
      currentIndex={tabs.findIndex((v) => v.value === curTab)}
    >
      {tabs.map((v) => (
        <div
          key={v.value}
          onClick={(e) => {
            if (disable) {
              e.stopPropagation();
              return;
            }
            changeTab(v.value);
          }}
          className={`body-l cursor-pointer  text-neutral-off-black ${curTab === v.value ? '  body-l-bold ' : ' '}`}
        >
          {v.label}
          {'count' in v && `(${separationNumber(v.count as number)})`}
        </div>
      ))}
    </SlideHighlight>
  );
};

export default Tab;
