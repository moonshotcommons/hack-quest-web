'use client';
import React, { useState } from 'react';
import { titleTxtData } from '../../constants/data';

interface NavProp {}

const Nav: React.FC<NavProp> = () => {
  const [curIndex, setCurIndex] = useState(0);
  return (
    <div className="body-l w-[325px] pr-[20px] ">
      {titleTxtData.map((v, i) => (
        <div
          key={i}
          onClick={() => setCurIndex(i)}
          className={`mb-[4px] flex h-[42px] cursor-pointer items-center overflow-hidden rounded-l-[8px] border-l-[9px]  pl-[28px] ${curIndex === i ? 'border-yellow-primary bg-neutral-white text-neutral-black' : 'border-transparent text-neutral-medium-gray'}`}
        >
          {v}
        </div>
      ))}
    </div>
  );
};

export default Nav;
