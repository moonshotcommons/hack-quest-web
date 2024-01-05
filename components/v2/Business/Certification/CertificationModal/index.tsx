import Modal from '@/components/Common/Modal';
import { cn } from '@/helper/utils';
import iconCoin from '@/public/images/mission-center/icon_coin.png';
import iconXp from '@/public/images/mission-center/icon_xp.png';
import { CertificationType } from '@/service/webApi/campaigns/type';
import Image from 'next/image';
import { forwardRef, useImperativeHandle, useState } from 'react';
import GettingCertificate from './GettingCertificate';
import NotCertified from './NotCertified';

interface CertificationModalProps {
  certification: CertificationType;
  showCoin?: boolean;
  completed?: boolean;
  campaignId?: string;
  onClose?: VoidFunction;
  refreshCertification?: VoidFunction;
}

export interface CertificationModalInstance {
  open: (params?: any) => void;
}

const CertificationModal = forwardRef<
  CertificationModalInstance,
  CertificationModalProps
>((props, ref) => {
  const {
    certification,
    completed,
    campaignId,
    showCoin = false,
    onClose,
    refreshCertification
  } = props;
  const [open, setOpen] = useState(false);
  useImperativeHandle(ref, () => {
    return {
      open() {
        setOpen(true);
      }
    };
  });

  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
        onClose?.();
      }}
      showCloseIcon
      icon={closeIcon}
      markBg="black"
    >
      <div className="w-[1080px] bg-white rounded-[10px] p-[60px]">
        <div className="flex gap-x-[60px] items-center">
          <div className="flex flex-col">
            <div className="w-[452px] h-[250px] relative">
              <Image
                src={certification.image || ''}
                fill
                alt="certification"
                className={cn(!certification.claimed ? 'blur-[2px]' : '')}
              ></Image>
              {!certification.claimed && (
                <>
                  <div className="absolute w-full h-full bg-black/10 rounded-[15px] flex justify-center items-center"></div>
                  <div className="absolute  w-full flex py-[25px] bg-white/70 justify-center items-center top-1/2 -translate-y-1/2 text-h2 tracking-[2.4px] text-[#131313]">
                    NOT CERTIFIED
                  </div>
                </>
              )}
            </div>
            {showCoin && (
              <>
                <div className="flex items-center gap-[30px] mt-[20px]">
                  <span className="inline-block h-[1px] flex-1 bg-black scale-y-50"></span>
                  <span className="text-[18px] font-next-poster text-[#0b0b0b] tracking-[1.08px]">
                    and
                  </span>
                  <span className="inline-block h-[1px] flex-1 bg-black scale-y-50"></span>
                </div>
                <div className="flex mt-[20px] gap-[20px] justify-center">
                  <div className="px-[15px] flex items-center justify-between box-border w-[125px] h-[60px] border-[2px] border-[#DADADA] rounded-[15px]">
                    <Image
                      src={iconCoin}
                      width={40}
                      alt="icon"
                      className=""
                    ></Image>
                    <span>x{certification?.credits}</span>
                  </div>
                  <div className="px-[15px] flex items-center justify-between box-border w-[125px] h-[60px] border-[2px] border-[#DADADA] rounded-[15px]">
                    <Image
                      src={iconXp}
                      width={40}
                      alt="icon"
                      className=""
                    ></Image>
                    <span>x{certification?.exp}</span>
                  </div>
                </div>
              </>
            )}
          </div>
          {!certification.claimed && (
            <NotCertified
              onClose={() => setOpen(false)}
              completed={completed}
              campaignId={campaignId}
            ></NotCertified>
          )}
          {certification.claimed && (
            <GettingCertificate
              certification={certification}
              refreshCertification={refreshCertification}
              closeModal={() => setOpen(false)}
            ></GettingCertificate>
          )}
        </div>
      </div>
    </Modal>
  );
});

const closeIcon = (
  <div className="absolute -top-[4px] -right-[4px] cursor-pointer">
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="22.2734"
        y1="22.2745"
        x2="7.42416"
        y2="7.42521"
        stroke="#0B0B0B"
      />
      <line
        x1="7.42574"
        y1="22.2744"
        x2="22.275"
        y2="7.42513"
        stroke="#0B0B0B"
      />
    </svg>
  </div>
);

CertificationModal.displayName = 'CertificationModal';

export default CertificationModal;
