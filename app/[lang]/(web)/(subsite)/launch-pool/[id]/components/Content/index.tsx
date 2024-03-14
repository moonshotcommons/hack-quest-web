import React from 'react';
import OverView from './OverView';
import TimeLine from './TimeLine';

interface ContentProp {}

const Content: React.FC<ContentProp> = () => {
  return (
    <div className="scroll-wrap-y  flex h-full flex-1 flex-col">
      <OverView />
      <TimeLine />
    </div>
  );
};

export default Content;
