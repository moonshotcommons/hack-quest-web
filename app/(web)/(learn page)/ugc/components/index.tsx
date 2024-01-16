'use client';
import React from 'react';
import { UgcContext } from '../constants/type';
import UgcFooter from './UgcFooter';

interface UgcProp {}

const Ugc: React.FC<UgcProp> = () => {
  const onNextClick = () => {};
  return (
    <UgcContext.Provider value={{}}>
      <div className="h-full flex flex-col">
        <div className="w-full flex-1"></div>
        <UgcFooter onNextClick={onNextClick} />
      </div>
    </UgcContext.Provider>
  );
};

export default Ugc;
