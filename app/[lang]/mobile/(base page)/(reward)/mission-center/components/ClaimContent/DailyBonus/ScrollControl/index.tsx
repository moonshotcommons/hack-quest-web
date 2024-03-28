import { ChangeState } from '@/components/Common/ScrollContainer';
import { BurialPoint } from '@/helper/burialPoint';
import { cn } from '@/helper/utils';
import { useEffect, useRef, useState } from 'react';
import { HiArrowLongRight, HiArrowLongLeft } from 'react-icons/hi2';

function ScrollControl({ changeState }: { changeState?: ChangeState }) {
  const { handleArrowClick, rightArrowVisible, leftArrowVisible } = changeState || {};

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
            `flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-[50%] border border-solid border-[#FDEAAA] bg-[#FDEAAA] text-neutral-black`,
            !leftArrowVisible
              ? 'text-neutral-black/40 cursor-not-allowed border-[#FDEAAA]/40 bg-[#FDEAAA]/40'
              : 'transition hover:border-yellow-primary hover:bg-yellow-primary'
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
            `flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-full border border-solid border-[#FDEAAA] bg-[#FDEAAA] text-neutral-black`,
            !rightArrowVisible
              ? 'text-neutral-black/40 cursor-not-allowed border-[#FDEAAA]/40 bg-[#FDEAAA]/40'
              : 'transition hover:border-yellow-primary hover:bg-yellow-primary'
          )}
          onClick={() => {
            BurialPoint.track('mission-center-daily-bonus claim滚动-右');
            handleArrowClick?.('right');
          }}
        >
          <HiArrowLongRight size={24}></HiArrowLongRight>
        </div>
      </div>
      <div className=" relative mt-[15px] h-[2px] w-[210px] bg-[#DADADA] shadow-[0px_1px_2px_0_rgba(0,0,0,0.25)]" ref={scrollBarRef}>
        <div
          className="absolute bottom-0 left-0 h-[3px] bg-neutral-medium-gray transition-transform"
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
