import React, { useState } from 'react';
import { VscAdd, VscChromeMinimize } from 'react-icons/vsc';
import Image from 'next/image';
import Certificate from '@/public/images/campaigns/certificate.png';
import iconXp from '@/public/images/mission-center/icon_xp.png';
import iconCoin from '@/public/images/mission-center/icon_coin.png';
import Button from '@/components/v2/Common/Button';
import { Inter, DM_Sans } from 'next/font/google';
const inter = DM_Sans({
  weight: ['400', '700', '500'],
  subsets: ['latin', 'latin-ext']
});

interface MantleInfoProp {}

const MantleInfo: React.FC<MantleInfoProp> = ({}) => {
  const [showAll, setShowAll] = useState(true);
  return (
    <div className="flex justify-between gap-[50px] mb-[30px]">
      <div className={`flex-1 text-[#000] ${inter.className}`}>
        <p className="text-[24px] font-[500] leading-[25px] mb-[10px]">
          Mantle Developer Journey
        </p>
        <p className="text-[16px] font-[400]">
          Developers reach 500 developer miles can claim Mantle learning
          certificate and participate in lucky draw.
        </p>
      </div>
      <div className="w-[572px] h-fit p-[20px] border border-[#8c8c8c] rounded-[10px] font-next-book">
        <div className="flex-row-center justify-between mb-[5px]">
          <div className="text-[18px]">Certificate & Rewards</div>
          <div onClick={() => setShowAll(!showAll)} className="cursor-pointer">
            {showAll ? (
              <VscChromeMinimize size={20}></VscChromeMinimize>
            ) : (
              <VscAdd size={20}></VscAdd>
            )}
          </div>
        </div>
        {showAll && (
          <>
            <div className="text-[14px] font-next-book-Thin mb-[20px]">
              {`You'll earn a certificate demonstrating your proficiency and receive
          Web3 awards upon successfully completing this campaign.`}
            </div>
            <div className="h-[140px] relative">
              <div className="absolute w-[calc(100%+10px)] left-[-5px] h-full flex justify-between ">
                <Image
                  src={Certificate}
                  width={240}
                  alt="certificate"
                  className=""
                ></Image>
                <div className="w-[265px] h-full flex flex-col justify-between py-[6px]">
                  <div className="flex gap-[12px]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="w-[40px]">
                        <div className="w-full h-[40px] rounded-[50%] bg-[#DADADA] mb-[4px] relative">
                          <Image
                            src={iconCoin}
                            width={40}
                            alt="icon"
                            className=""
                          ></Image>
                        </div>
                        <p className="text-center">x3</p>
                      </div>
                    ))}
                  </div>
                  <Button
                    className={`w-full h-[44px] text-[#0b0b0b] text-[16px] p-0
                          bg-auth-primary-button-bg
                          border-auth-primary-button-border-color ${
                            true
                              ? 'opacity-50 cursor-not-allowed '
                              : `hover:border-auth-primary-button-border-hover-color
                                  hover:text-auth-primary-button-text-hover-color 
                                  hover:bg-auth-primary-button-hover-bg`
                          }`}
                  >
                    Claim Certificate & Rewards
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MantleInfo;
