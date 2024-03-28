import SlideHighlight from '@/components/Common/Navigation/SlideHighlight';
import MenuLink from '@/constants/MenuLink';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface FilterLetterProp {
  letterData: string[];
  letterClick: (letter: string) => void;
  isSticky: boolean;
  letter: string;
}

const FilterLetter: React.FC<FilterLetterProp> = ({ letterData, letterClick, isSticky, letter }) => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleClick = (v: string) => {
    letterClick(v);
    router.push(`${MenuLink.GLOSSARY}#glossary-${v}`);
  };
  useEffect(() => {
    let index = letterData.indexOf(letter);
    setCurrentIndex(index);
  }, [letter]);
  return (
    <div className={`w-full bg-neutral-white py-[5px] ${isSticky ? 'shadow-[0_0px_4px_0_rgba(0,0,0,0.25)]' : ''}`}>
      <SlideHighlight
        className="container mx-auto flex items-center text-[18px]"
        type={'GLOSSARY_FILTER'}
        currentIndex={currentIndex}
      >
        {letterData.map((v) => (
          <div
            key={v}
            className={`flex-center relative h-[49px] w-[calc(100%/26)] cursor-pointer rounded-[8px] uppercase  ${v === letter ? 'body-l-bold text-neutral-off-black' : 'body-l text-neutral-medium-gray'}`}
            onClick={() => handleClick(v)}
          >
            {v}
          </div>
        ))}
      </SlideHighlight>
    </div>
  );
};

export default FilterLetter;
