'use client';
import { FC, ReactNode, useEffect, useRef } from 'react';
import BScroll from '@better-scroll/core';
interface ScrollContainerProps {
  className?: string;
  children: ReactNode;
}

const ScrollContainer: FC<ScrollContainerProps> = ({ className, children }) => {
  const scrollContainerInstance = useRef<HTMLDivElement>(null);
  const contentInstance = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollContainerInstance.current && contentInstance.current) {
      new BScroll(scrollContainerInstance.current, {
        scrollX: true,
        probeType: 3,
        click: true,
        startX:
          (scrollContainerInstance.current.clientWidth -
            contentInstance.current.clientWidth) /
          2
      });
    }
  }, []);

  return (
    <div
      className={'relative whitespace-nowrap overflow-hidden'}
      ref={scrollContainerInstance}
    >
      <div className="inline-block min-w-full" ref={contentInstance}>
        {children}
      </div>
    </div>
  );
};

export default ScrollContainer;
