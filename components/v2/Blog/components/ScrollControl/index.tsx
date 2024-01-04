'use client';
import { ChangeState } from '@/components/v2/Common/ScrollContainer';
import { BurialPoint } from '@/helper/burialPoint';
import { cn } from '@/helper/utils';
import { useEffect, useRef, useState } from 'react';
import { HiArrowLongRight, HiArrowLongLeft } from 'react-icons/hi2';
import { paginationWidth } from './data';

function ScrollControl({ changeState }: { changeState?: ChangeState }) {
  const { handleArrowClick, rightArrowVisible, leftArrowVisible } =
    changeState || {};

  const [translateX, setTranslateX] = useState(0);

  const scrollBarRef = useRef<HTMLDivElement>(null);
  const scrollBarInstanceRef = useRef<HTMLDivElement>(null);
  const [paginationIndex, setPaginationIndex] = useState(0);
  const [paginationNum, setPaginationNum] = useState(0);
  useEffect(() => {
    if (!changeState) return;
    const { containerWidth, listWidth, translateX } = changeState;
    if (containerWidth / listWidth) {
      setPaginationNum(Math.ceil(1 / (containerWidth / listWidth)));
    }
    if (scrollBarRef.current && scrollBarInstanceRef.current) {
      const scrollbarInstanceWidth = scrollBarInstanceRef.current.clientWidth;
      setTranslateX(translateX * (scrollbarInstanceWidth / containerWidth));
    }
  }, [changeState]);
  useEffect(() => {
    setPaginationIndex((0 - translateX) / paginationWidth);
  }, [translateX]);

  if (!leftArrowVisible && !rightArrowVisible) return null;
  return (
    <div className="flex items-center gap-[20px]">
      <div className="flex gap-[10px]">
        <div
          className={cn(
            `flex items-center justify-center w-[35px] h-[35px] rounded-full bg-[#fff] shadow-[0px_0px_0px_rgba(0.12)] text-[#0b0b0b] cursor-pointer`
          )}
          onClick={() => {
            BurialPoint.track('mission-center-daily-bonus claim滚动-左');
            handleArrowClick?.('left');
          }}
        >
          <HiArrowLongLeft size={24}></HiArrowLongLeft>
        </div>
        <div
          className={cn(
            `flex items-center justify-center w-[35px] h-[35px] rounded-full bg-[#fff] shadow-[0px_0px_0px_rgba(0.12)]  text-[#0b0b0b] cursor-pointer`
          )}
          onClick={() => {
            BurialPoint.track('mission-center-daily-bonus claim滚动-右');
            handleArrowClick?.('right');
          }}
        >
          <HiArrowLongRight size={24}></HiArrowLongRight>
        </div>
      </div>
      <div className="relative  h-[3px]" ref={scrollBarRef}>
        <div className="h-full absolute left-0 bottom-0 flex gap-[3px]">
          {Array.from({ length: paginationNum }).map((_, i) => (
            <div
              key={i}
              className="h-full bg-[#DADADA]"
              style={{ width: `${paginationWidth}px` }}
            ></div>
          ))}
        </div>
        <div
          className="h-full bg-[#8C8C8C] absolute left-0 bottom-0 transition-transform"
          ref={scrollBarInstanceRef}
          style={{
            width: `${paginationWidth}px`,
            transform: `translateX(${-(translateX - paginationIndex * 3)}px)`
          }}
        ></div>
      </div>
    </div>
  );
}

export default ScrollControl;
