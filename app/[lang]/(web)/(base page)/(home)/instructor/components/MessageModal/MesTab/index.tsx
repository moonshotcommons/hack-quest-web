'use client';
import SlideHighlight from '@/components/Common/Navigation/SlideHighlight';
import React from 'react';
import { MessageTab } from '../../../constants/type';
import { messageTab } from '../../../constants/data';

interface MesTabProp {
  curTab: MessageTab;
  changeTab: (val: MessageTab) => void;
}

const MesTab: React.FC<MesTabProp> = ({ curTab, changeTab }) => {
  return (
    <SlideHighlight
      className={`flex gap-[30px] pb-[2px]`}
      type="LEARNING_TRACK"
      currentIndex={messageTab.findIndex((v) => v.value === curTab)}
    >
      {messageTab.map((v) => (
        <div
          key={v.value}
          onClick={() => changeTab(v.value as MessageTab)}
          className={`body-l cursor-pointer  text-neutral-black ${
            curTab === v.value ? '  body-l-bold ' : ' '
          }`}
        >
          {`${v.label} (${v.count})`}
        </div>
      ))}
    </SlideHighlight>
  );
};

export default MesTab;
