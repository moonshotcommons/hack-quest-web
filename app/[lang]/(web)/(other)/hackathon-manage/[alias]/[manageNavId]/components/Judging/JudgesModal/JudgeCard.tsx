import { HackathonJudgeAccountType } from '@/service/webApi/resourceStation/type';
import Image from 'next/image';
import React from 'react';

interface JudgeCardProp {
  handleRemove: VoidFunction;
  judgeAccount: HackathonJudgeAccountType;
}

const JudgeCard: React.FC<JudgeCardProp> = ({ handleRemove, judgeAccount }) => {
  return (
    <div className="body-m flex items-center justify-between text-neutral-off-black">
      <div className="flex items-center gap-[12px]">
        <div className="relative h-[50px] w-[50px] overflow-hidden rounded-[50%]">
          <Image src={judgeAccount.avatar || ''} alt={judgeAccount.nickname} fill className="object-contain"></Image>
        </div>
        <span>{judgeAccount.nickname}</span>
      </div>
      <div className="flex items-center gap-[40px]">
        <span className="text-neutral-medium-gray">{judgeAccount.email}</span>
        <span className="cursor-pointer underline" onClick={handleRemove}>
          Remove
        </span>
      </div>
    </div>
  );
};

export default JudgeCard;
