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
      className={`h-[82px] rounded-[10px] border  mt-[15px] relative ${
        false ? 'border-[#ffd850]' : 'border-[#8C8C8C]'
      }`}
    >
      <div
        className="h-full bg-[rgba(255,244,206,0.4)] opacity-40 absolute left-0 top-0 rounded-[10px]"
        style={{
          width: `${50}%`
        }}
      ></div>
      <div className="absolute w-full h-full left-0 top-0 flex justify-between items-center px-[30px] ">
        <div className="flex-row-center gap-[20px]">
          <span className="text-[16px] tracking-[0.32px]">
            Join our Discord community
          </span>
        </div>
        <div className="flex-row-center gap-[40px]">
          <div className="flex-row-center justify-between px-[10px] w-[75px] h-[44px] leading-[40px] text-[#000] text-[16px] border border-[#DADADA] bg-[#F4F4F4] rounded-[100px]">
            <Image src={BIcon} width={24} alt="icon" className=""></Image>
            <span>20</span>
          </div>
          {false ? (
            <Button
              className={`w-[164px] ml-[-20px] h-[44px] text-[#0b0b0b] 
                          bg-auth-primary-button-bg
                          border-auth-primary-button-border-color ${
                            true
                              ? 'opacity-50 cursor-not-allowed '
                              : `hover:border-auth-primary-button-border-hover-color
                                  hover:text-auth-primary-button-text-hover-color 
                                  hover:bg-auth-primary-button-hover-bg`
                          }`}
            >
              {true ? 'Claimed' : 'Claim'}
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
