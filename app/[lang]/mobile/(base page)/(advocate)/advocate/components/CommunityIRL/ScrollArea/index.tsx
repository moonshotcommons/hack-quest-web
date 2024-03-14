'use client';
import { FC, ReactNode, useRef } from 'react';
import ScrollContainer, { ScrollContainerRef } from '../../ScrollContainer';

interface ScrollAreaProps {
  leftContent: ReactNode;
  rightContent: ReactNode;
}

const ScrollArea: FC<ScrollAreaProps> = ({ leftContent, rightContent }) => {
  const leftScrollContainer = useRef<ScrollContainerRef>(null);
  const rightScrollContainer = useRef<ScrollContainerRef>(null);

  return (
    <div
      className="my-[60px] flex flex-col gap-[30px]"
      onMouseEnter={() => {
        leftScrollContainer.current?.stop();
        rightScrollContainer.current?.stop();
      }}
      onMouseLeave={() => {
        leftScrollContainer.current?.continue();
        rightScrollContainer.current?.continue();
      }}
    >
      <ScrollContainer ref={leftScrollContainer}>{leftContent}</ScrollContainer>
      <ScrollContainer ref={rightScrollContainer} dir="right">
        {rightContent}
      </ScrollContainer>
    </div>
  );
};

export default ScrollArea;
