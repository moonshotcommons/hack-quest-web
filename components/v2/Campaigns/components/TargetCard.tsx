import Button from '@/components/v2/Common/Button';
import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import BIcon from '@/public/images/campaigns/b_icon.png';
import { useRouter } from 'next/router';
import webApi from '@/service';

interface TargetCardProp {
  target: any;
}
const TargetCard: React.FC<TargetCardProp> = ({ target }) => {
  return (
    <div
      key={target.id}
      className={`h-[84px] rounded-[10px] border  mt-[15px] relative ${
        target.progress?.completed ? 'border-[#ffd850]' : 'border-[#8C8C8C]'
      }`}
    >
      <div
        className="h-full bg-auth-primary-button-bg opacity-40 absolute left-0 top-0"
        style={{
          width: `${
            (target.progress.progress[0] / target.progress.progress[1]) * 100
          }%`
        }}
      ></div>
      <div className="absolute w-full h-full left-0 top-0 flex justify-between items-center px-[30px] ">
        <div className="flex-row-center gap-[40px]">
          <div className="w-[76px] h-[40px] leading-[40px] text-[18px] border border-[#DADADA] bg-[#F4F4F4] rounded-r-[20px] relative pr-[15px] text-right">
            <Image src={BIcon} width={24} alt="icon" className=""></Image>
            <span>{target.exp}</span>
          </div>
          {target.progress?.completed ? (
            <Button
              className={`w-[164px] ml-[-20px] h-[44px] text-[#0b0b0b] 
                          bg-auth-primary-button-bg
                          border-auth-primary-button-border-color ${
                            target.progress.claimed
                              ? 'opacity-50 cursor-not-allowed '
                              : `hover:border-auth-primary-button-border-hover-color
                                  hover:text-auth-primary-button-text-hover-color 
                                  hover:bg-auth-primary-button-hover-bg`
                          }`}
            >
              {target.progress.claimed ? 'Claimed' : 'Claim'}
            </Button>
          ) : (
            <div className="relative">
              <Button
                className={`w-[164px] p-0 ml-[-20px] h-[44px] text-[14px] text-[#0b0b0b] 
              text-auth-primary-button-text-color  border
              border-[#0b0b0b]`}
              >
                <div className="flex items-center">Go to Dashboard</div>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TargetCard;
