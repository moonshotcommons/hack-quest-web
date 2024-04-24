import React from 'react';
import ArrowDown from '@/public/images/hackathon/arrow_down.png';
import Image from 'next/image';

interface ArrowProp {}

const Arrow: React.FC<ArrowProp> = () => {
  return (
    <div className="mt-[1.25rem] flex justify-center">
      <Image src={ArrowDown} width={32} alt="arrow-down" />
    </div>
  );
};

export default Arrow;
