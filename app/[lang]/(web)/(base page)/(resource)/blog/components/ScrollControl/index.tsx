'use client';
import { ChangeState } from '@/components/Common/ScrollContainer';
import { BurialPoint, BurialPointType } from '@/helper/burialPoint';
import { cn } from '@/helper/utils';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { HiArrowLongRight, HiArrowLongLeft } from 'react-icons/hi2';
import { paginationWidth, MaxpaginationBoxWidth } from './data';

interface ScrollControlType {
  changeState?: ChangeState;
  burialPointType?: BurialPointType[];
}

const ScrollControl: React.FC<ScrollControlType> = ({
  changeState,
  burialPointType = ['home-featured course滚动-左', 'home-featured course滚动-右']
}) => {
  const { handleArrowClick, rightArrowVisible, leftArrowVisible } = changeState || {};

  const [translateX, setTranslateX] = useState(0);

  const scrollBarRef = useRef<HTMLDivElement>(null);
  const scrollBarInstanceRef = useRef<HTMLDivElement>(null);
  const [paginationIndex, setPaginationIndex] = useState(0);
  const [paginationNum, setPaginationNum] = useState(0);

  const paginatWidth = useMemo(() => {
    let w = (MaxpaginationBoxWidth - paginationNum * 3) / paginationNum;
    return w < paginationWidth ? w : paginationWidth;
  }, [paginationNum]);

  useEffect(() => {
    if (!changeState) return;
    const { containerWidth, listWidth, translateX } = changeState;
    if (containerWidth / listWidth) {
      setPaginationNum(Math.ceil(1 / (containerWidth / listWidth)));
    }
    setPaginationIndex(Math.ceil(-translateX / containerWidth));
  }, [changeState]);

  useEffect(() => {
    setTranslateX(paginatWidth * paginationIndex + paginationIndex * 3);
  }, [paginationIndex, paginatWidth]);

  if (!leftArrowVisible && !rightArrowVisible) return null;
  return (
    <div className="flex items-center gap-[20px]">
      <div className="flex gap-[10px]">
        <div
          className={cn(
            `flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-full bg-neutral-white text-neutral-black shadow-[0px_0px_8px_rgba(0,0,0,0.12)]`
          )}
          onClick={() => {
            BurialPoint.track(burialPointType[0]);
            handleArrowClick?.('left');
          }}
        >
          <HiArrowLongLeft size={20}></HiArrowLongLeft>
        </div>
        <div
          className={cn(
            `flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-full bg-neutral-white  text-neutral-black shadow-[0px_0px_8px_rgba(0,0,0,0.12)]`
          )}
          onClick={() => {
            BurialPoint.track(burialPointType[1]);
            handleArrowClick?.('right');
          }}
        >
          <HiArrowLongRight size={20}></HiArrowLongRight>
        </div>
      </div>
      <div className="relative  h-[3px]" ref={scrollBarRef}>
        <div className="absolute bottom-0 left-0 flex h-full gap-[3px]">
          {Array.from({ length: paginationNum }).map((_, i) => (
            <div key={i} className="h-full bg-neutral-light-gray" style={{ width: `${paginatWidth}px` }}></div>
          ))}
        </div>
        <div
          className="absolute bottom-0 left-0 h-full bg-yellow-dark transition-transform"
          ref={scrollBarInstanceRef}
          style={{
            width: `${paginatWidth}px`,
            transform: `translateX(${translateX}px)`
          }}
        ></div>
      </div>
    </div>
  );
};

export default ScrollControl;
