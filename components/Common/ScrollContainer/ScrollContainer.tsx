import type { ReactElement } from 'react';
import { forwardRef, useEffect, useMemo, useRef, useState } from 'react';

import useResizeObserver from '@/hooks/useDomHooks/useResizeObserver';
import { cn } from '@/helper/utils';

export interface ScrollContainerProps {
  width?: number | string;
  children: ReactElement;
  onChange: (state: any) => void;
  /** 运算时候的间隙 */
  gap?: number;
  className?: string;
}

const LEFT = 'left';
const RIGHT = 'right';

export interface ChangeState {
  containerWidth: number;
  listWidth: number;
  handleArrowClick: (direction: 'right' | 'left') => void;
  leftArrowVisible: boolean;
  rightArrowVisible: boolean;
  translateX: number;
}

export const ScrollContainer = forwardRef<unknown, ScrollContainerProps>(
  function (props, ref) {
    const { width = 'inherit', children, onChange, className, gap = 0 } = props;
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
          setTranslateX((cur) => cur + containerWidth + gap);
        } else {
          setTranslateX((cur) => cur + leftSpaceWidth);
        }
      }

      if (direction === RIGHT) {
        const rightSpaceWidth =
          listWidth - Math.abs(translateX) - containerWidth;
        if (rightSpaceWidth > containerWidth) {
          setTranslateX((cur) => cur - containerWidth - gap);
        } else {
          setTranslateX((cur) => cur - rightSpaceWidth);
        }
      }
    };

    useEffect(() => {
      const state: ChangeState = {
        handleArrowClick,
        containerWidth,
        listWidth,
        translateX,
        leftArrowVisible: leftArrowVisible ?? false,
        rightArrowVisible: rightArrowVisible ?? false
      };
      onChange(state);
    }, [
      containerWidth,
      listWidth,
      translateX,
      leftArrowVisible,
      rightArrowVisible
    ]);

    return (
      <div
        ref={containerRef}
        className={cn(
          `relative flex h-auto w-auto overflow-x-hidden`,
          className
        )}
      >
        <div
          ref={listRef}
          className="flex items-center transition-transform"
          style={{
            transform: `translateX(${translateX}px)`
          }}
        >
          {children}
        </div>
      </div>
    );
  }
);

ScrollContainer.displayName = 'ScrollContainer';
