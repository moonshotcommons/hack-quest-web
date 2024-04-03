import { MOBILE_NAVBAR_HEIGHT } from '@/components/Mobile/MobLayout/BasePage/Navbar/constant';
import { useGetPageInfo } from '@/hooks/dom/useGetPageInfo';
import React from 'react';

interface FilterLetterProp {
  letterData: string[];
  letterClick: (letter: string) => void;
  letter: string;
}

const FilterLetter: React.FC<FilterLetterProp> = ({ letterData, letterClick, letter }) => {
  const pageInfo = useGetPageInfo();
  const handleClick = (v: string) => {
    letterClick(v);
  };
  return (
    <div
      className="no-scrollbar fixed bottom-[6.25rem] right-[.8125rem]  z-[9]  flex w-[.875rem] items-end overflow-auto"
      style={{
        height: `${pageInfo.windowHeight - MOBILE_NAVBAR_HEIGHT - 100}px`
      }}
    >
      <div className={`flex max-h-full w-full flex-col`}>
        {letterData.map((v) => (
          <div
            key={v}
            className={`flex-center body-xs relative mb-[.25rem] h-[1.1875rem] w-full cursor-pointer rounded-[8px] uppercase  ${v === letter ? 'text-neutral-off-black' : 'text-neutral-medium-gray'}`}
            onClick={() => handleClick(v)}
          >
            {v}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterLetter;
