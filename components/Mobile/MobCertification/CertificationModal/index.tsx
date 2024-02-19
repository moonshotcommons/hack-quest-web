'use client';
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
      <div className="w-[1080px] rounded-[10px] bg-neutral-white p-[60px]">
        <div className="flex items-center gap-x-[60px]">
          <div className="flex flex-col">
            <div className="relative h-[250px] w-[452px]">
              <Image
                src={certification.image || ''}
                fill
                alt="certification"
                className={cn(!certification.claimed ? 'blur-[2px]' : '')}
              ></Image>
              {!certification.claimed && (
                <>
                  <div className="bg-neutral-black/10 absolute flex h-full w-full items-center justify-center rounded-[15px]"></div>
                  <div className="bg-neutral-white/70  text-h2 absolute top-1/2 flex w-full -translate-y-1/2 items-center justify-center py-[25px] tracking-[2.4px] text-neutral-off-black">
                    NOT CERTIFIED
                  </div>
                </>
              )}
            </div>
            {showCoin && (
              <>
                <div className="mt-[20px] flex items-center gap-[30px]">
                  <span className="inline-block h-[1px] flex-1 scale-y-50 bg-neutral-black"></span>
                  <span className="body-l-bold text-neutral-black">and</span>
                  <span className="inline-block h-[1px] flex-1 scale-y-50 bg-neutral-black"></span>
                </div>
                <div className="mt-[20px] flex justify-center gap-[20px]">
                  <div className="box-border flex h-[60px] w-[125px] items-center justify-between rounded-[15px] border-[2px] border-neutral-light-gray px-[15px]">
                    <Image
                      src={iconCoin}
                      width={40}
                      alt="icon"
                      className=""
                    ></Image>
                    <span>x{certification?.credits}</span>
                  </div>
                  <div className="box-border flex h-[60px] w-[125px] items-center justify-between rounded-[15px] border-[2px] border-neutral-light-gray px-[15px]">
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
  <div className="absolute -right-[4px] -top-[4px] cursor-pointer">
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
