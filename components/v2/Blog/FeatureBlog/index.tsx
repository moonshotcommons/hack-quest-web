import React, { useRef, useState } from 'react';
import FeatureBlogCard from '../components/FeatureBlogCard.tsx';
import ScrollControl from '../components/ScrollControl';
import {
  ChangeState,
  ScrollContainer
} from '@/components/Common/ScrollContainer';

interface FeatureBlogProp {}

const FeatureBlog: React.FC<FeatureBlogProp> = () => {
  const scrollContainerRef = useRef<any>();
  const [scrollContainerState, setScrollContainerState] =
    useState<ChangeState>();

  return (
    <div>
      <ScrollContainer
        ref={scrollContainerRef}
        onChange={(state: any) => setScrollContainerState(state)}
      >
        <div className="flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <div className="container p-[5px]" key={i}>
              <FeatureBlogCard />
            </div>
          ))}
        </div>
      </ScrollContainer>
      <div className="mt-[30px]">
        <ScrollControl changeState={scrollContainerState}></ScrollControl>
      </div>
    </div>
  );
};

export default FeatureBlog;
