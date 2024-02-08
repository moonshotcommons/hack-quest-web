'use client';
import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import BScroll from '@better-scroll/core';
import { useInterval } from 'ahooks';
interface ScrollContainerProps {
  className?: string;
  children: ReactNode;
}

const ScrollContainer: FC<ScrollContainerProps> = ({ className, children }) => {
  const scrollContainerInstance = useRef<HTMLDivElement>(null);
  const contentInstance = useRef<HTMLDivElement>(null);

  const [startX, setStartX] = useState(0);
  const add = useRef(1);

  const clear = useInterval(() => {
    setStartX((state) => {
      if (scrollContainerInstance.current && contentInstance.current) {
        let max =
          scrollContainerInstance.current?.clientWidth -
          contentInstance.current?.clientWidth;
        if (state <= max && add.current === 1) {
          add.current = -1;
        }

        if (state >= 0 && add.current === -1) {
          add.current = 1;
        }
        return state - add.current;
      }

      return state;
    });
  }, 30);

  useEffect(() => {
    let bs: BScroll;
    if (scrollContainerInstance.current && contentInstance.current) {
      bs = new BScroll(scrollContainerInstance.current, {
        scrollX: true,
        probeType: 3,
        click: true,
        startX: 1
      });

      let max =
        scrollContainerInstance.current?.clientWidth -
        contentInstance.current?.clientWidth;

      if (max >= 0) {
        clear();
      }

      bs.on('beforeScrollStart', () => {
        clear();
      });
    }

    return () => {
      bs.destroy();
      clear();
    };
  }, []);

  return (
    <div
      className={'relative overflow-hidden whitespace-nowrap'}
      ref={scrollContainerInstance}
    >
      <div
        className="inline-block min-w-full"
        ref={contentInstance}
        style={{ transform: `translateX(${startX}px)` }}
      >
        {children}
      </div>
    </div>
  );
};

export default ScrollContainer;
