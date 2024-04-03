import { LetterDataType } from '@/app/[lang]/(web)/(base page)/(resource)/glossary/constants/type';
import { MOBILE_NAVBAR_HEIGHT } from '@/components/Mobile/MobLayout/BasePage/Navbar/constant';
import { useGetPageInfo } from '@/hooks/dom/useGetPageInfo';
import React from 'react';

interface FilterLetterProp {
  letterData: LetterDataType[];
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
      className="no-scrollbar fixed bottom-[6.25rem] right-[.8125rem]  z-[11]  flex w-[.875rem] items-end overflow-auto"
      style={{
        height: `${pageInfo.windowHeight - MOBILE_NAVBAR_HEIGHT - 100}px`
      }}
    >
      <div className={`flex max-h-full w-full flex-col`}>
        {letterData.map((v) => (
          // <Link key={v.letter} href={v.url}>
          <div
            key={v.letter}
            className={`flex-center body-xs relative mb-[.25rem] h-[1.1875rem] w-full cursor-pointer rounded-[8px] uppercase  ${v.letter === letter ? 'text-neutral-off-black' : 'text-neutral-medium-gray'}`}
            onClick={() => handleClick(v.letter)}
          >
            {v.letter}
          </div>
          // </Link>
        ))}
      </div>
    </div>
  );
};

export default FilterLetter;
