import { ChangeState } from '@/components/Common/ScrollContainer';
import { BurialPoint } from '@/helper/burialPoint';
import { cn } from '@/helper/utils';
import { useEffect, useRef, useState } from 'react';
import { HiArrowLongRight, HiArrowLongLeft } from 'react-icons/hi2';

function ScrollControl({ changeState }: { changeState?: ChangeState }) {
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
            `flex items-center justify-center w-[35px] h-[35px] rounded-[50%] border border-solid border-[#FDEAAA] bg-[#FDEAAA] text-[#0b0b0b] cursor-pointer`,
            !leftArrowVisible
              ? 'bg-[#FDEAAA]/40 text-[#0b0b0b]/40 border-[#FDEAAA]/40 cursor-not-allowed'
              : 'hover:bg-yellow-primary hover:border-yellow-primary transition'
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
            `flex items-center justify-center w-[35px] h-[35px] rounded-full border border-solid border-[#FDEAAA] bg-[#FDEAAA] text-[#0b0b0b] cursor-pointer`,
            !rightArrowVisible
              ? 'bg-[#FDEAAA]/40 text-[#0b0b0b]/40 border-[#FDEAAA]/40 cursor-not-allowed'
              : 'hover:bg-yellow-primary hover:border-yellow-primary transition'
          )}
          onClick={() => {
            BurialPoint.track('mission-center-daily-bonus claim滚动-右');
            handleArrowClick?.('right');
          }}
        >
          <HiArrowLongRight size={24}></HiArrowLongRight>
        </div>
      </div>
      <div
        className=" relative w-[210px] h-[2px] bg-[#DADADA] mt-[15px] shadow-[0px_1px_2px_0_rgba(0,0,0,0.25)]"
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
}

export default ScrollControl;
