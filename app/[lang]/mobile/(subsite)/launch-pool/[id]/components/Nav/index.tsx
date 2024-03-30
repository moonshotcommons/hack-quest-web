'use client';
import React from 'react';
import { titleTxtData } from '../../constants/data';

interface NavProp {
  handleClickAnchor: (index: number) => void;
  curAnchorIndex: number;
}

const Nav: React.FC<NavProp> = ({ handleClickAnchor, curAnchorIndex }) => {
  return (
    <div className="body-l sticky left-0 top-0 w-[325px] pr-[20px] ">
      {titleTxtData.map((v, i) => (
        <div
          key={i}
          onClick={() => handleClickAnchor(i)}
          className={`mb-[4px] flex h-[42px] cursor-pointer items-center overflow-hidden rounded-l-[8px] border-l-[9px]  pl-[28px] ${i === curAnchorIndex ? 'border-yellow-primary bg-neutral-white text-neutral-black' : 'border-transparent text-neutral-medium-gray'}`}
        >
          {v}
        </div>
      ))}
    </div>
  );
};

export default Nav;
