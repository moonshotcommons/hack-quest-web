'use client';
import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import BScroll from '@better-scroll/core';
import { useInterval } from 'ahooks';
interface ScrollContainerProps {
  className?: string;
  children: ReactNode;
  dir?: 'left' | 'right';
}

const ScrollContainer: FC<ScrollContainerProps> = ({
  className,
  children,
  dir = 'left'
}) => {
  const scrollContainerInstance = useRef<HTMLDivElement>(null);
  const contentInstance = useRef<HTMLDivElement>(null);

  const [startX, setStartX] = useState(dir === 'left' ? 0 : -704);
  const add = useRef(1);

  const clear = useInterval(() => {
    setStartX((state) => {
      if (scrollContainerInstance.current && contentInstance.current) {
        if (dir === 'left') {
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
        } else {
          let min =
            scrollContainerInstance.current?.clientWidth -
            contentInstance.current?.clientWidth;
          if (state >= 0 && add.current === 1) {
            add.current = -1;
          }

          if (state <= min && add.current === -1) {
            add.current = 1;
          }
          return state + add.current;
        }
      }

      return state;
    });
  }, 30);

  useEffect(() => {
    let bs: BScroll;
    if (scrollContainerInstance.current && contentInstance.current) {
      let diff =
        scrollContainerInstance.current?.clientWidth -
        contentInstance.current?.clientWidth;
      let max = 0;
      let startX = 0;
      if (dir === 'left') {
        max = diff;
        startX = 1;
        if (max >= 0) {
          clear();
        }
      } else {
        max = 1;
        startX = diff;
      }

      // setStartX(startX);

      bs = new BScroll(scrollContainerInstance.current, {
        scrollX: true,
        probeType: 3,
        click: true,
        startX: startX
      });

      if (diff >= 0) {
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
