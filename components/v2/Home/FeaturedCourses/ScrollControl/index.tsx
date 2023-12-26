import { ChangeState } from '@/components/v2/Common/ScrollContainer';
import { BurialPoint, BurialPointType } from '@/helper/burialPoint';
import { cn } from '@/helper/utils';
import React, { useEffect, useRef, useState } from 'react';
import { HiArrowLongRight, HiArrowLongLeft } from 'react-icons/hi2';

interface ScrollControlType {
  changeState?: ChangeState;
  burialPointType?: BurialPointType[];
}

const ScrollControl: React.FC<ScrollControlType> = ({
  changeState,
  burialPointType = [
    'home-featured course滚动-左',
    'home-featured course滚动-右'
  ]
}) => {
  const { handleArrowClick, rightArrowVisible, leftArrowVisible } =
    changeState || {};

  const [widthRatio, setWidthRatio] = useState(0);
  const [translateX, setTranslateX] = useState(0);

  const scrollBarRef = useRef<HTMLDivElement>(null);
  const scrollBarInstanceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!changeState) return;
    const { containerWidth, listWidth, translateX } = changeState;
    setWidthRatio(containerWidth / listWidth);
    if (scrollBarRef.current && scrollBarInstanceRef.current) {
      const scrollbarInstanceWidth = scrollBarInstanceRef.current.clientWidth;
      setTranslateX(translateX * (scrollbarInstanceWidth / containerWidth));
    }
  }, [changeState]);

  if (!leftArrowVisible && !rightArrowVisible) return null;

  return (
    <div>
      <div className="flex gap-[10px]">
        <div
          className={cn(
            `flex items-center justify-center p-2 rounded-full border border-solid border-[#000000] bg-[#000000] text-white cursor-pointer scale-[0.835]`,
            !leftArrowVisible
              ? 'bg-transparent text-black cursor-not-allowed'
              : 'hover:bg-[#000000]/70 hover:border-[#000000]/70 transition'
          )}
          onClick={() => {
            BurialPoint.track(burialPointType[0]);
            handleArrowClick?.('left');
          }}
        >
          <HiArrowLongLeft size={24}></HiArrowLongLeft>
        </div>
        <div
          className={cn(
            `flex items-center justify-center p-2 rounded-full border border-solid border-[#000000] bg-[#000000] text-white cursor-pointer scale-[0.835]`,
            !rightArrowVisible
              ? 'bg-transparent text-black cursor-not-allowed'
              : 'hover:bg-[#000000]/70 hover:border-[#000000]/70 transition'
          )}
          onClick={() => {
            BurialPoint.track(burialPointType[1]);
            handleArrowClick?.('right');
          }}
        >
          <HiArrowLongRight size={24}></HiArrowLongRight>
        </div>
      </div>
      <div
        className="max-w-[502px] relative w-[502px] h-[2px] bg-[#DADADA] mt-[15px]"
        ref={scrollBarRef}
      >
        <div
          className="h-[3px] bg-[#8C8C8C] absolute left-0 bottom-0 transition-transform"
          ref={scrollBarInstanceRef}
          style={{
            width: `${widthRatio * 100}%`,
            transform: `translateX(${-translateX}px)`
          }}
        ></div>
      </div>
    </div>
  );
};

export default ScrollControl;
