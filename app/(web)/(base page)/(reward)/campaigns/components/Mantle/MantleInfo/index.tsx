import CertificationModal, {
  CertificationModalInstance
} from '@/components/Web/Business/Certification/CertificationModal';
import Button from '@/components/Common/Button';
import { BurialPoint } from '@/helper/burialPoint';
import Certificate from '@/public/images/campaigns/certificate.png';
import iconCoin from '@/public/images/mission-center/icon_coin.png';
import iconXp from '@/public/images/mission-center/icon_xp.png';
import Image from 'next/image';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { VscAdd, VscChromeMinimize } from 'react-icons/vsc';
import { MantleContext } from '../../../constants/type';

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
      <div className={`max-w-[470px] flex-1`}>
        <p className="text-h3 mb-[10px] font-next-book-bold text-neutral-off-black">
          {mantle.title}
        </p>
        <p className="body-l text-neutral-rich-gray">{mantle.description}</p>
      </div>
      <div
        className={`flex h-fit gap-[32px] rounded-[16px] border border-neutral-medium-gray p-[20px] ${
          showAll ? 'w-[547px]' : 'w-[306px]'
        }`}
      >
        {showAll && (
          <div className="flex w-[187px] flex-col justify-between">
            <div
              className="relative mb-[8px] h-[103px] w-full cursor-pointer bg-neutral-white transition-transform hover:-translate-y-1 hover:scale-[1.03]"
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
            <div className="body-s flex gap-[10px] text-neutral-black">
              <div className="flex h-[34px] w-[74px] items-center gap-[5px] rounded-[6px] border border-neutral-light-gray px-[5px]">
                <Image
                  src={iconCoin}
                  width={22}
                  alt="icon"
                  className=""
                ></Image>
                <span>x{mantle.certification?.credits}</span>
              </div>
              <div className="flex h-[34px] w-[74px] items-center gap-[5px] rounded-[6px] border border-neutral-light-gray px-[5px]">
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
              <div className="body-l-bold">{mantle.certification?.name}</div>
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
                className={`body-s mb-[20px] mt-[5px] line-clamp-3 text-neutral-rich-gray`}
              >
                {mantle.certification?.description}
              </div>
            )}
          </div>
          {showAll && (
            <div className="flex gap-[8px]">
              <Button
                className={`button-text-s h-[34px] flex-1 uppercase
                           ${
                             !mantle.completed
                               ? 'cursor-not-allowed bg-neutral-light-gray text-neutral-medium-gray'
                               : !buttonDisable
                                 ? 'bg-yellow-primary text-neutral-black'
                                 : 'cursor-not-allowed bg-yellow-primary text-neutral-black opacity-50'
                           }`}
                loading={loading}
                disabled={buttonDisable}
                onClick={campaignsClaim}
              >
                {mantle.certification.claimed ? 'minted' : 'Claim'}
              </Button>
              <Button
                ghost
                className={`button-text-s h-[34px] flex-1 border-neutral-black  p-0 uppercase text-neutral-black`}
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
