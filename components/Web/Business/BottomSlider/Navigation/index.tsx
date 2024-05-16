import { ChangeState } from '@/components/Common/ScrollContainer';
import React from 'react';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';

interface NavigationProp {
  changeState?: ChangeState;
}

const Navigation: React.FC<NavigationProp> = ({ changeState }) => {
  const { handleArrowClick, rightArrowVisible, leftArrowVisible } = changeState || {};
  return (
    <>
      <div
        className="flex-center absolute left-0 top-[50%] z-[99] h-[56px] w-[56px] translate-y-[-50%] cursor-pointer rounded-[50%] bg-[rgba(244,244,244,0.8)] text-neutral-medium-gray"
        onClick={() => {
          handleArrowClick?.('left');
        }}
      >
        <LuChevronLeft size={40} />
      </div>
      <div
        className="flex-center absolute right-0 top-[50%] z-[99] h-[56px] w-[56px] translate-y-[-50%] cursor-pointer rounded-[50%] bg-[rgba(244,244,244,0.8)] text-neutral-medium-gray"
        onClick={() => {
          handleArrowClick?.('right');
        }}
      >
        <LuChevronRight size={40} />
      </div>
    </>
  );
};

export default Navigation;
