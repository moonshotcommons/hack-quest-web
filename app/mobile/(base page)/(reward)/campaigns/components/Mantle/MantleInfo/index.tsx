import Button from '@/components/Common/Button';
import { BurialPoint } from '@/helper/burialPoint';
import Certificate from '@/public/images/campaigns/certificate.png';
import iconCoin from '@/public/images/mission-center/icon_coin.png';
import iconXp from '@/public/images/mission-center/icon_xp.png';
import Image from 'next/image';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { VscAdd, VscChromeMinimize } from 'react-icons/vsc';
import { MantleContext } from '../../../constants/type';
import CertificationModal, {
  CertificationModalInstance
} from '@/components/Mobile/MobCertification/CertificationModal';

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
    <div className="mt-[1rem]">
      <div className={`mb-[1.75rem]`}>
        <p className="text-h2-mob mb-[.5rem] font-next-book-bold text-neutral-off-black">
          {mantle.title}
        </p>
        <p className="body-s  text-neutral-rich-gray">{mantle.description}</p>
      </div>
      <div
        className={`h-fit rounded-[1rem] border border-neutral-medium-gray p-[1.25rem]`}
      >
        <div
          className="flex-row-center cursor-pointer justify-between text-neutral-off-black"
          onClick={() => {
            BurialPoint.track('campaigns certificateCard show all 点击');
            setShowAll(!showAll);
          }}
        >
          <div className="body-m-bold">{mantle.certification?.name}</div>
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
            <div className="mt-[.5rem] flex gap-[1rem]">
              <div
                className="flex-1"
                onClick={() => {
                  certificationModalRef.current?.open();
                }}
              >
                <div className="relative h-0 w-full  overflow-hidden  bg-neutral-white pt-[55.45%]">
                  <Image
                    src={mantle.certification?.image || Certificate}
                    alt="certificate"
                    fill
                    className="object-cover"
                  ></Image>
                </div>
              </div>
              <div className="body-s  flex-shrink-0 text-neutral-black">
                <div className="flex h-[34px] w-[74px] items-center gap-[5px] rounded-[6px] border border-neutral-light-gray px-[5px]">
                  <Image
                    src={iconCoin}
                    width={22}
                    alt="icon"
                    className=""
                  ></Image>
                  <span>x{mantle.certification?.credits}</span>
                </div>
                <div className="mt-[.625rem] flex h-[34px] w-[74px] items-center gap-[5px] rounded-[6px] border border-neutral-light-gray px-[5px]">
                  <Image
                    src={iconXp}
                    width={22}
                    alt="icon"
                    className=""
                  ></Image>
                  <span>x{mantle.certification?.exp}</span>
                </div>
              </div>
            </div>
            <div className={`body-s mt-[.5rem]  text-neutral-rich-gray`}>
              {mantle.certification?.description}
            </div>
            <div className="mt-[16px] flex gap-[.5rem]">
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
                {mantle.certification.claimed ? 'Claimed' : 'Claim'}
              </Button>
              <Button
                ghost
                className={`button-text-s h-[34px] flex-1  border-neutral-black uppercase text-neutral-black`}
                onClick={learnMore}
              >
                Learn More
              </Button>
            </div>
          </>
        )}
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
