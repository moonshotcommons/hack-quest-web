import React from 'react';
import Image from 'next/image';
import IconHack from '@/public/images/mission-center/icon_hack.png';
import { separationNumber } from '@/helper/utils';
import Button from '@/components/Common/Button';

interface TargetCardProp {}

const TargetCard: React.FC<TargetCardProp> = () => {
  const completed = true;
  const claimed = true;
  return (
    <div
      className={`body-m item-center mt-[16px] flex justify-between gap-[40px] rounded-[16px] border  px-[30px] py-[22px] text-neutral-black ${completed ? 'border-yellow-dark bg-yellow-light' : 'border-neutral-light-gray bg-neutral-white'}`}
    >
      <div className="flex items-center gap-[19px]">
        <div className="relative h-[40px] w-[40px] overflow-hidden">
          <Image
            src={IconHack}
            alt="avatar"
            fill
            className="object-cover"
          ></Image>
        </div>
        <span>xxxxx</span>
      </div>
      <div className="flex items-center gap-[20px]">
        <div className="flex h-[40px] w-[145px] items-center justify-between rounded-r-[20px] border border-neutral-light-gray bg-neutral-off-white pr-[15px]">
          <div className="flex-center relative left-[-20px] h-[40px] w-[40px] rounded-[50%] bg-yellow-primary">
            <div className="flex-center body-l h-[32px] w-[32px] rounded-[50%] bg-yellow-light">
              🚀
            </div>
          </div>
          <span>{`${separationNumber(500)}`}</span>
        </div>
        <Button
          className={`button-text-s h-[34px] w-[165px]  uppercase ${!completed ? 'cursor-not-allowed bg-neutral-light-gray text-neutral-medium-gray' : claimed ? 'cursor-not-allowed bg-yellow-primary text-neutral-black opacity-50' : 'bg-yellow-primary text-neutral-black'}`}
        >
          {`${claimed ? 'claimed' : 'claim'}`}
        </Button>
      </div>
    </div>
  );
};

export default TargetCard;
