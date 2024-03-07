import type { ReactElement } from 'react';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import useResizeObserver from '@/hooks/useDomHooks/useResizeObserver';
import LeftArrowIcon from '../Icon/LeftArrow';
import RightArrowIcon from '../Icon/RightArrow';

export interface SliderContainerProps {
  width?: number | string;
  children: ReactElement;
}

const LEFT = 'left';
const RIGHT = 'right';

export const SliderContainer: React.FC<SliderContainerProps> = ({
  width = 'inherit',
  children
}) => {
  const listRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const containerWidth = useResizeObserver(containerRef);
  const [listWidth, setListWidth] = useState(0);
  const [translateX, setTranslateX] = useState(0);

  const cache = useRef(containerWidth);

  useEffect(() => {
    if (
      containerWidth > cache.current &&
      translateX < 0 &&
      listWidth - Math.abs(translateX) - containerWidth <= 0
    ) {
      const distance = containerWidth - cache.current;
      setTranslateX((cur) => cur + distance);
    }
    // 更新缓存
    cache.current = containerWidth;
  }, [containerWidth, translateX, listWidth]);

  useEffect(() => {
    setListWidth((listRef.current as HTMLDivElement).clientWidth);
  }, [children]);

  const [leftArrowVisible, rightArrowVisible] = useMemo(() => {
    let leftArrowVisible,
      rightArrowVisible = false;

    if (listWidth - Math.abs(translateX) - containerWidth > 0) {
      rightArrowVisible = true;
    }

    if (translateX < 0) {
      leftArrowVisible = true;
    }

    return [leftArrowVisible, rightArrowVisible];
  }, [listWidth, translateX, containerWidth]);

  const handleArrowClick = (direction: string) => {
    if (direction === LEFT) {
      const leftSpaceWidth = Math.abs(translateX);
      if (leftSpaceWidth > containerWidth) {
        setTranslateX((cur) => cur + containerWidth);
      } else {
        setTranslateX((cur) => cur + leftSpaceWidth);
      }
    }

    if (direction === RIGHT) {
      const rightSpaceWidth = listWidth - Math.abs(translateX) - containerWidth;
      if (rightSpaceWidth > containerWidth) {
        setTranslateX((cur) => cur - containerWidth);
      } else {
        setTranslateX((cur) => cur - rightSpaceWidth);
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative flex h-auto w-auto overflow-hidden`}
    >
      {leftArrowVisible && (
        <>
          <div
            className="hq-arrow absolute left-0 top-1/2 z-20 -translate-y-1/2 bg-course-banner-arrow-bg  text-course-banner-arrow-color"
            onClick={() => handleArrowClick(LEFT)}
          >
            <LeftArrowIcon></LeftArrowIcon>
          </div>
          <div className="absolute -left-4 top-0 z-[18] h-full w-20 select-none bg-gradient-to-l  from-transparent to-default-global-bg"></div>
        </>
      )}

      <div
        ref={listRef}
        className="flex items-center transition-transform"
        style={{
          transform: `translateX(${translateX}px)`
        }}
      >
        {children}
      </div>
      <div className="absolute -right-[1.25rem] top-0 h-full w-20 bg-gradient-to-r from-transparent to-default-global-bg"></div>
      {rightArrowVisible && (
        <>
          <div
            className="hq-arrow absolute right-0 top-1/2 z-20 -translate-y-1/2 bg-course-banner-arrow-bg  text-course-banner-arrow-color"
            onClick={() => handleArrowClick(RIGHT)}
          >
            <RightArrowIcon></RightArrowIcon>
          </div>
        </>
      )}
    </div>
  );
};
