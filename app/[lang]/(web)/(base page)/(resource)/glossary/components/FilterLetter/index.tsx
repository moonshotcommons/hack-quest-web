import SlideHighlight from '@/components/Common/Navigation/SlideHighlight';
import React, { useEffect, useState } from 'react';
import { LetterDataType } from '../../constants/type';

interface FilterLetterProp {
  letterData: LetterDataType[];
  letterClick: (letter: string) => void;
  isSticky: boolean;
  letter: string;
}

const FilterLetter: React.FC<FilterLetterProp> = ({ letterData, letterClick, isSticky, letter }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleClick = (v: string) => {
    letterClick(v);
  };
  useEffect(() => {
    let index = letterData.findIndex((v) => v.letter === letter);
    setCurrentIndex(index);
  }, [letter, letterData]);
  return (
    <div className={`w-full bg-neutral-white py-[5px] ${isSticky ? 'shadow-[0_0px_4px_0_rgba(0,0,0,0.25)]' : ''}`}>
      <SlideHighlight
        className="container mx-auto flex items-center text-[18px]"
        type={'GLOSSARY_FILTER'}
        currentIndex={currentIndex}
      >
        {letterData.map((v, i) => (
          // <Link key={v.letter} href={v.url} className="w-[calc(100%/26)]">
          <div
            key={v.letter}
            className={`flex-center relative h-[49px] w-[calc(100%/26)] cursor-pointer rounded-[8px] uppercase  ${i === currentIndex ? 'body-l-bold text-neutral-off-black' : 'body-l text-neutral-medium-gray'}`}
            onClick={() => handleClick(v.letter)}
          >
            {v.letter}
          </div>
          // </Link>
        ))}
      </SlideHighlight>
    </div>
  );
};

export default FilterLetter;
