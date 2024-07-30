import Image from 'next/image';
import React from 'react';

interface JudgeCardProp {
  handleRemove: VoidFunction;
}

const JudgeCard: React.FC<JudgeCardProp> = ({ handleRemove }) => {
  return (
    <div className="body-m flex items-center justify-between text-neutral-off-black">
      <div className="flex items-center gap-[12px]">
        <div className="relative h-[50px] w-[50px] overflow-hidden rounded-[50%]">
          <Image src={'/images/learn/hack_logo.png'} alt={'111'} fill className="object-contain"></Image>
        </div>
        <span>Peter Parker</span>
      </div>
      <div className="flex items-center gap-[40px]">
        <span className="text-neutral-medium-gray">abcdefg@gmail.com</span>
        <span className="cursor-pointer underline" onClick={handleRemove}>
          Remove
        </span>
      </div>
    </div>
  );
};

export default JudgeCard;
