'use client';

import React, { useRef, useState } from 'react';
import ScrollControl from '../ScrollControl';
import { ChangeState, ScrollContainer } from '@/components/Common/ScrollContainer';
import { BlogType } from '@/service/webApi/resourceStation/type.js';
import BlogCard from '@/components/Web/Business/BlogCard';

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
            <div className="w-[calc(100vw-2.5rem)] p-[.3125rem]" key={blog.id}>
              <BlogCard blog={blog} />
            </div>
          ))}
        </div>
      </ScrollContainer>
      <div className="mt-[1.75rem]">
        <ScrollControl changeState={scrollContainerState}></ScrollControl>
      </div>
    </div>
  );
};

export default FeatureBlog;
