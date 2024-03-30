import MenuLink from '@/constants/MenuLink';
import useGetHeight from '@/hooks/dom/useGetHeight';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface FilterLetterProp {
  letterData: string[];
  letterClick: (letter: string) => void;
  letter: string;
}

const FilterLetter: React.FC<FilterLetterProp> = ({ letterData, letterClick, letter }) => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const { pageHeight } = useGetHeight();
  const handleClick = (v: string) => {
    letterClick(v);
    router.push(`${MenuLink.GLOSSARY}#glossary-${v}`);
  };
  useEffect(() => {
    let index = letterData.indexOf(letter);
    setCurrentIndex(index);
  }, [letter]);
  return (
    <div className="no-scrollbar fixed bottom-[6.25rem] right-[.8125rem] top-[4.375rem] z-[9] flex w-[.875rem] flex-col justify-end overflow-auto  ">
      <div className={`flex w-full flex-col gap-[.25rem] `}>
        {letterData.map((v) => (
          <div
            key={v}
            className={`flex-center body-xs relative h-[1.1875rem] w-full cursor-pointer rounded-[8px] uppercase  ${v === letter ? 'text-neutral-off-black' : 'text-neutral-medium-gray'}`}
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
