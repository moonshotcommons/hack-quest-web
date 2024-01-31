import CertificationModal, {
  CertificationModalInstance
} from '@/components/Web/Business/Certification/CertificationModal';
import Button from '@/components/Common/Button';
import { BurialPoint } from '@/helper/burialPoint';
import Certificate from '@/public/images/campaigns/certificate.png';
import iconCoin from '@/public/images/mission-center/icon_coin.png';
import iconXp from '@/public/images/mission-center/icon_xp.png';
import { DM_Sans } from 'next/font/google';
import Image from 'next/image';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { VscAdd, VscChromeMinimize } from 'react-icons/vsc';
import { MantleContext } from '../../../constants/type';
const inter = DM_Sans({
  weight: ['400', '700', '500'],
  subsets: ['latin', 'latin-ext']
});

interface MantleInfoProp {}

const MantleInfo: React.FC<MantleInfoProp> = ({}) => {
  const { mantle, campaignsClaim, loading, refresh } =
    useContext(MantleContext);
  const [showAll, setShowAll] = useState(true);
  const certificationModalRef = useRef<CertificationModalInstance>(null);

  const buttonDisable = useMemo(() => {
    return !(mantle.completed && !mantle.certification.claimed);
  }, [mantle]);

  const learnMore = () => {
    certificationModalRef.current?.open();
    BurialPoint.track('campaigns certificateCard learn more 按钮点击');
  };
  useEffect(() => {
    setShowAll(!buttonDisable);
  }, [buttonDisable]);
  return (
    <div className="mb-[30px] flex justify-between gap-[50px]">
      <div className={`flex-1 text-neutral-black ${inter.className}`}>
        <p className="body-xl-bold mb-[10px] leading-[25px]">{mantle.title}</p>
        <p className="body-m">{mantle.description}</p>
      </div>
      <div
        className={`flex h-fit gap-[40px] rounded-[10px] border border-neutral-medium-gray px-[30px] py-[20px] ${
          showAll ? 'w-[567px]' : 'w-[306px]'
        }`}
      >
        {showAll && (
          <div className="w-[218px]">
            <div
              className="relative mb-[8px] h-[121px] w-[218px] cursor-pointer bg-neutral-white transition-transform hover:-translate-y-1 hover:scale-[1.03]"
              onClick={() => {
                certificationModalRef.current?.open();
              }}
            >
              <Image
                src={mantle.certification?.image || Certificate}
                alt="certificate"
                fill
              ></Image>
            </div>
            <div className="flex gap-[10px] text-[14px]">
              <div className="flex h-[32px] w-[69px] items-center justify-between rounded-[6px] border border-neutral-light-gray px-[5px]">
                <Image
                  src={iconCoin}
                  width={22}
                  alt="icon"
                  className=""
                ></Image>
                <span>x{mantle.certification?.credits}</span>
              </div>
              <div className="flex h-[32px] w-[69px] items-center justify-between rounded-[6px] border border-neutral-light-gray px-[5px]">
                <Image src={iconXp} width={22} alt="icon" className=""></Image>
                <span>x{mantle.certification?.exp}</span>
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-1 flex-col justify-between">
          <div className="">
            <div
              className="flex-row-center cursor-pointer justify-between"
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
                className={`mb-[20px] mt-[5px] text-[14px] ${inter.className}`}
              >
                {mantle.certification?.description}
              </div>
            )}
          </div>
          {showAll && (
            <div className="flex justify-between">
              <Button
                className={`body-m h-[34px] w-[120px] border-auth-primary-button-border-color bg-auth-primary-button-bg
                          p-0
                          text-neutral-black ${
                            buttonDisable
                              ? 'cursor-not-allowed opacity-50 '
                              : `hover:border-auth-primary-button-border-hover-color
                                  hover:bg-auth-primary-button-hover-bg
                                  hover:text-auth-primary-button-text-hover-color`
                          }`}
                loading={loading}
                disabled={buttonDisable}
                onClick={campaignsClaim}
              >
                {mantle.certification.claimed ? 'Claimed' : 'Claim'}
              </Button>
              <Button
                className={`h-[34px] w-[120px] border border-neutral-black p-0
                          text-[14px] text-neutral-black`}
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
        completed={mantle.completed}
        campaignId={mantle.id}
        refreshCertification={refresh}
        showCoin={true}
      />
    </div>
  );
};

export default MantleInfo;
