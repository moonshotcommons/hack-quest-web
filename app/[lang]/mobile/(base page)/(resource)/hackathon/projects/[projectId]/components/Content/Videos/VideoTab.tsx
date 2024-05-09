import SlideHighlight from '@/components/Common/Navigation/SlideHighlight';
import React from 'react';

export interface TabType {
  label: string;
  url: string;
}
interface VideoTabProp {
  tab: TabType[];
  curIndex: number;
  handleChangeTab: (index: number) => void;
}

const VideoTab: React.FC<VideoTabProp> = ({ tab, curIndex, handleChangeTab }) => {
  return (
    <SlideHighlight className={`flex gap-[1.875rem] pb-[.125rem]`} type="LEARNING_TRACK" currentIndex={curIndex}>
      {tab.map((v, i) => (
        <div
          key={v.label}
          onClick={() => handleChangeTab(i)}
          className={`body-l cursor-pointer  text-neutral-off-black ${curIndex === i ? '  body-l-bold ' : ' '}`}
        >
          {v.label}
        </div>
      ))}
    </SlideHighlight>
  );
};

export default VideoTab;
