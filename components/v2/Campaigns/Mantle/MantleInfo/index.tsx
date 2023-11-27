import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { VscAdd, VscChromeMinimize } from 'react-icons/vsc';
import Image from 'next/image';
import Certificate from '@/public/images/campaigns/certificate.png';
import iconXp from '@/public/images/mission-center/icon_xp.png';
import iconCoin from '@/public/images/mission-center/icon_coin.png';
import Button from '@/components/v2/Common/Button';
import { Inter, DM_Sans } from 'next/font/google';
import { MantleContext } from '@/components/v2/Campaigns/Mantle/type';
import { BurialPoint } from '@/helper/burialPoint';
import CertificationModal, {
  CertificationModalInstance
} from '@/components/v2/Certification/CertificationModal';
const inter = DM_Sans({
  weight: ['400', '700', '500'],
  subsets: ['latin', 'latin-ext']
});

interface MantleInfoProp {}

const MantleInfo: React.FC<MantleInfoProp> = ({}) => {
  const { mantle, campaignsClaim, loading } = useContext(MantleContext);
  const [showAll, setShowAll] = useState(true);
  const certificationModalRef = useRef<CertificationModalInstance>(null);
  const buttonDisable = useMemo(() => {
    return !(mantle.completed && !mantle.claimed);
  }, [mantle]);
  const learnMore = () => {
    certificationModalRef.current?.open();
    BurialPoint.track('campaigns certificateCard learn more 按钮点击');
  };
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
      <div
        className={`h-fit flex gap-[40px] px-[30px] py-[20px] border border-[#8c8c8c] rounded-[10px] font-next-book ${
          showAll ? 'w-[495px]' : 'w-[306px]'
        }`}
      >
        {showAll && (
          <div className="w-[146px]">
            <div className="w-full h-[169px] relative mb-[8px]">
              <Image
                src={mantle.certification?.image || Certificate}
                alt="certificate"
                fill
                className="object-cover"
              ></Image>
            </div>
            <div className="flex justify-between text-[14px]">
              <div className="px-[5px] flex items-center justify-between w-[69px] h-[32px] border border-[#DADADA] rounded-[6px]">
                <Image
                  src={iconCoin}
                  width={22}
                  alt="icon"
                  className=""
                ></Image>
                <span>x{mantle.certification?.credits}</span>
              </div>
              <div className="px-[5px] flex items-center justify-between w-[69px] h-[32px] border border-[#DADADA] rounded-[6px]">
                <Image src={iconXp} width={22} alt="icon" className=""></Image>
                <span>x{mantle.certification?.exp}</span>
              </div>
            </div>
          </div>
        )}
        <div className="flex-1 flex flex-col justify-between">
          <div className="">
            <div
              className="flex-row-center justify-between cursor-pointer"
              onClick={() => {
                BurialPoint.track('campaigns certificateCard show all 点击');
                setShowAll(!showAll);
              }}
            >
              <div className="text-[18px]">{mantle.certification?.name}</div>
              <div>
                {showAll ? (
                  <VscChromeMinimize size={20}></VscChromeMinimize>
                ) : (
                  <VscAdd size={20}></VscAdd>
                )}
              </div>
            </div>
            {showAll && (
              <div
                className={`text-[14px] mt-[5px] mb-[20px] ${inter.className}`}
              >
                {mantle.certification?.description}
              </div>
            )}
          </div>
          {showAll && (
            <div className="flex justify-between">
              <Button
                className={`w-[120px] h-[34px] text-[#0b0b0b] text-[16px] p-0
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
                {!buttonDisable ? 'Claimed' : 'Claim'}
              </Button>
              <Button
                className={`w-[120px] h-[34px] text-[#0b0b0b] p-0 text-[14px]
                          border border-[#0b0b0b]`}
                onClick={learnMore}
              >
                Learn More
              </Button>
            </div>
          )}
        </div>
      </div>
      <CertificationModal
        ref={certificationModalRef}
        certification={mantle.certification}
        showCoin={true}
      />
    </div>
  );
};

export default MantleInfo;
