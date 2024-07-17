import SlideHighlight from '@/components/Common/Navigation/SlideHighlight';
import React from 'react';
import { applicationTabData } from '../../../../constants/data';
import { ApplicationStatus } from '../../../../constants/type';
import { separationNumber } from '@/helper/utils';

interface TabProp {
  curTab: ApplicationStatus;
  changeTab: (tab: ApplicationStatus) => void;
}

const Tab: React.FC<TabProp> = ({ changeTab, curTab }) => {
  return (
    <SlideHighlight
      className={`flex gap-[30px] pb-[2px]`}
      type="LEARNING_TRACK"
      currentIndex={applicationTabData.findIndex((v) => v.value === curTab)}
    >
      {applicationTabData.map((v) => (
        <div
          key={v.value}
          onClick={() => changeTab(v.value)}
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
