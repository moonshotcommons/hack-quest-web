import LeftArrowIcon from '@/components/Common/Icon/LeftArrow';
import RightArrowIcon from '@/components/Common/Icon/RightArrow';
import { ChangeState } from '@/components/Common/ScrollContainer';
import { cn } from '@/helper/utils';
import { useEffect, useRef, useState } from 'react';

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
      console.log(translateX);
      setTranslateX(translateX * (scrollbarInstanceWidth / containerWidth));
    }
  }, [changeState]);

  if (!leftArrowVisible && !rightArrowVisible) return null;

  return (
    <div>
      <div className="flex gap-[10px]">
        <div
          className={cn(
            `flex items-center justify-center p-2 rounded-full border border-solid border-[#000000] bg-[#000000] text-white cursor-pointer`,
            !leftArrowVisible
              ? 'bg-transparent text-black cursor-not-allowed'
              : 'hover:bg-[#000000]/70 hover:border-[#000000]/70 transition'
          )}
          onClick={() => handleArrowClick?.('left')}
        >
          <LeftArrowIcon></LeftArrowIcon>
        </div>
        <div
          className={cn(
            `flex items-center justify-center p-2 rounded-full border border-solid border-[#000000] bg-[#000000] text-white cursor-pointer`,
            !rightArrowVisible
              ? 'bg-transparent text-black cursor-not-allowed'
              : 'hover:bg-[#000000]/70 hover:border-[#000000]/70 transition'
          )}
          onClick={() => handleArrowClick?.('right')}
        >
          <RightArrowIcon></RightArrowIcon>
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
}

export default ScrollControl;
