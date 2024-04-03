'use client';

import React, { useRef, useState } from 'react';
import FeatureBlogCard from '../FeatureBlogCard.tsx';
import ScrollControl from '../ScrollControl';
import { ChangeState, ScrollContainer } from '@/components/Common/ScrollContainer';
import { BlogType } from '@/service/webApi/resourceStation/type.js';

interface FeatureBlogProp {
  list: BlogType[];
}

const FeatureBlog: React.FC<FeatureBlogProp> = ({ list }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollContainerState, setScrollContainerState] = useState<ChangeState>();
  return (
    <div className="mb-[80px]">
      <ScrollContainer ref={scrollContainerRef} onChange={(state: any) => setScrollContainerState(state)}>
        <div className="flex">
          {list.map((blog) => (
            <div className="container p-[5px]" key={blog.id}>
              <FeatureBlogCard blog={blog} />
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
