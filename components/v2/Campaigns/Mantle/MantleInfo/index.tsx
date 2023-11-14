import React, { use, useContext, useEffect, useMemo, useState } from 'react';
import { VscAdd, VscChromeMinimize } from 'react-icons/vsc';
import Image from 'next/image';
import Certificate from '@/public/images/campaigns/certificate.png';
import iconXp from '@/public/images/mission-center/icon_xp.png';
import iconCoin from '@/public/images/mission-center/icon_coin.png';
import Button from '@/components/v2/Common/Button';
import { Inter, DM_Sans } from 'next/font/google';
import { MantleContext } from '@/components/v2/Campaigns/Mantle/type';
const inter = DM_Sans({
  weight: ['400', '700', '500'],
  subsets: ['latin', 'latin-ext']
});

interface MantleInfoProp {}

const MantleInfo: React.FC<MantleInfoProp> = ({}) => {
  const { mantle, campaignsClaim, loading } = useContext(MantleContext);
  const [showAll, setShowAll] = useState(false);
  const buttonDisable = useMemo(() => {
    return !(mantle.completed && !mantle.claimed);
  }, [mantle]);
  useEffect(() => {
    setShowAll(!buttonDisable);
  }, [buttonDisable]);
  return (
    <div className="flex justify-between gap-[50px] mb-[30px]">
      <div className={`flex-1 text-[#000] ${inter.className}`}>
        <p className="text-[24px] font-[500] leading-[25px] mb-[10px]">
          {mantle.title}
        </p>
        <p className="text-[16px] font-[400]">{mantle.description}</p>
      </div>
      <div className="w-[572px] h-fit p-[20px] border border-[#8c8c8c] rounded-[10px] font-next-book">
        <div
          className="flex-row-center justify-between mb-[5px] cursor-pointer"
          onClick={() => setShowAll(!showAll)}
        >
          <div className="text-[18px]">{mantle.certificate?.title}</div>
          <div>
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
              {mantle.certificate?.description}
            </div>
            <div className="h-[140px] flex justify-between">
              <div className="w-[227px] h-full flex justify-between relative">
                <Image
                  src={mantle.certificate?.image || Certificate}
                  alt="certificate"
                  fill
                  className="object-cover"
                ></Image>
              </div>
              <div className="w-[265px] h-full flex flex-col justify-between py-[6px]">
                <div className="flex gap-[12px]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="w-[40px]">
                      <div className="w-full h-[40px] rounded-[50%] bg-[#DADADA] mb-[4px] relative">
                        {/* <Image
                            src={iconCoin}
                            width={40}
                            alt="icon"
                            className=""
                          ></Image> */}
                      </div>
                      <p className="text-center">x1</p>
                    </div>
                  ))}
                </div>
                <Button
                  className={`w-full h-[44px] text-[#0b0b0b] text-[16px] p-0
                          bg-auth-primary-button-bg
                          border-auth-primary-button-border-color ${
                            buttonDisable
                              ? 'opacity-50 cursor-not-allowed '
                              : `hover:border-auth-primary-button-border-hover-color
                                  hover:text-auth-primary-button-text-hover-color 
                                  hover:bg-auth-primary-button-hover-bg`
                          }`}
                  loading={loading}
                  disabled={buttonDisable}
                  onClick={campaignsClaim}
                >
                  Claim Certificate & Rewards
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MantleInfo;
