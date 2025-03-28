import { ChangeState } from './ScrollContainer';
import { BurialPoint, BurialPointType } from '@/helper/burialPoint';
import { cn } from '@/helper/utils';
import React, { useEffect, useRef, useState } from 'react';
import { HiArrowLongRight, HiArrowLongLeft } from 'react-icons/hi2';

interface ScrollControlProps {
  changeState?: ChangeState;
  showSlider?: boolean;
  controlWrapSize?: number;
  controlIconSize?: number;
  onLeftClick?: VoidFunction;
  onRightClick?: VoidFunction;
  burialPointType?: BurialPointType[];
}

function ScrollControl({
  changeState,
  showSlider = true,
  controlWrapSize,
  controlIconSize = 24,
  onLeftClick,
  onRightClick,
  burialPointType = ['home-featured course滚动-左', 'home-featured course滚动-右']
}: ScrollControlProps) {
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
      const scrollbarInstanceWidth = scrollBarInstanceRef.current
        .getBoundingClientRect()
        .width.toFixed(2) as unknown as number;
      setTranslateX(translateX * (scrollbarInstanceWidth / containerWidth));
    }
  }, [changeState]);

  if (!leftArrowVisible && !rightArrowVisible) return null;

  return (
    <div>
      <div className="flex gap-[10px]">
        <div
          className={cn(
            `flex scale-[0.835] cursor-pointer items-center justify-center rounded-full border border-solid border-[#000000] bg-[#000000] text-neutral-white`,
            !leftArrowVisible
              ? 'cursor-not-allowed bg-transparent text-neutral-black'
              : 'transition hover:border-[#000000]/70 hover:bg-[#000000]/70',
            !controlWrapSize ? 'p-2' : ''
          )}
          onClick={() => {
            BurialPoint.track(burialPointType[0]);
            handleArrowClick?.('left');
            onLeftClick?.();
          }}
          style={{
            width: controlWrapSize ? `${controlWrapSize}px` : 'fit-content',
            height: controlWrapSize ? `${controlWrapSize}px` : 'fit-content'
          }}
        >
          <HiArrowLongLeft size={controlIconSize}></HiArrowLongLeft>
        </div>
        <div
          className={cn(
            `flex scale-[0.835] cursor-pointer items-center justify-center rounded-full border border-solid border-[#000000] bg-[#000000] p-2 text-neutral-white`,
            !rightArrowVisible
              ? 'cursor-not-allowed bg-transparent text-neutral-black'
              : 'transition hover:border-[#000000]/70 hover:bg-[#000000]/70',
            !controlWrapSize ? 'p-2' : ''
          )}
          onClick={() => {
            BurialPoint.track(burialPointType[1]);
            handleArrowClick?.('right');
            onRightClick?.();
          }}
          style={{
            width: controlWrapSize ? `${controlWrapSize}px` : 'fit-content',
            height: controlWrapSize ? `${controlWrapSize}px` : 'fit-content'
          }}
        >
          <HiArrowLongRight size={controlIconSize}></HiArrowLongRight>
        </div>
      </div>
      {showSlider && (
        <div className="relative mt-[15px] h-[2px] w-[502px] max-w-[502px] bg-[#DADADA]" ref={scrollBarRef}>
          <div
            className="absolute bottom-0 left-0 h-[3px] bg-neutral-medium-gray transition-transform"
            ref={scrollBarInstanceRef}
            style={{
              width: `${widthRatio * 100}%`,
              transform: `translateX(${-translateX}px)`
            }}
          ></div>
        </div>
      )}
    </div>
  );
}

export default ScrollControl;
