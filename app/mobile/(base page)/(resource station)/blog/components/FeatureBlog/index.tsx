'use client';

import React, { useEffect, useRef, useState } from 'react';
import ScrollControl from '../ScrollControl';
import {
  ChangeState,
  ScrollContainer
} from '@/components/Common/ScrollContainer';
import { BlogType } from '@/service/webApi/resourceStation/type.js';
import BlogCard from '@/components/Web/Business/BlogCard';

interface FeatureBlogProp {
  list: BlogType[];
}

const FeatureBlog: React.FC<FeatureBlogProp> = ({ list }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollContainerState, setScrollContainerState] =
    useState<ChangeState>();
  const boxRef = useRef<HTMLDivElement>(null);
  const [boxWidth, setBoxWidth] = useState(0);

  useEffect(() => {
    setBoxWidth(boxRef.current?.getClientRects()[0].width || 0);
  }, []);
  return (
    <div className="mb-[80px]" ref={boxRef}>
      <ScrollContainer
        ref={scrollContainerRef}
        onChange={(state: any) => setScrollContainerState(state)}
      >
        <div className="flex">
          {list.map((blog) => (
            <div className="w-[calc(100vw-2.5rem)] p-[.3125rem]" key={blog.id}>
              <BlogCard blog={blog} isMobile={true} />
            </div>
          ))}
        </div>
      </ScrollContainer>
      <div className="mt-[1.75rem]">
        <ScrollControl
          changeState={scrollContainerState}
          boxWidth={boxWidth}
        ></ScrollControl>
      </div>
    </div>
  );
};

export default FeatureBlog;
