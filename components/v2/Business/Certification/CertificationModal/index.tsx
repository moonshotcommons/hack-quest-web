import Button from '@/components/v2/Common/Button';
import Modal from '@/components/v2/Common/Modal';
import { forwardRef, useImperativeHandle, useState } from 'react';

import { useRequest } from 'ahooks';
import { ReactNode } from 'react';
import webApi from '@/service';
import { cn, errorMessage } from '@/helper/utils';
import CertificationImage from '../CertificationCard/certificate.png';
import Image from 'next/image';
import NotCertified from './NotCertified';
import GettingCertificate from './GettingCertificate';
import { CertificationType } from '@/service/webApi/campagins/type';

interface CertificationModalProps {
  certification: CertificationType;
  showCoin?: boolean;
  completed?: boolean;
  campaignId?: string;
}

export interface CertificationModalInstance {
  open: (params?: any) => void;
}

const CertificationModal = forwardRef<
  CertificationModalInstance,
  CertificationModalProps
>((props, ref) => {
  const { certification, completed, campaignId, showCoin = false } = props;
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
      }}
      showCloseIcon
      icon={closeIcon}
      markBg="black"
    >
      <div className="w-[1000px] bg-white rounded-[10px] p-[70px]">
        <div className="flex gap-x-[60px] items-center">
          <div className="w-[370px] h-[425px] relative">
            <Image
              src={certification.image || ''}
              fill
              alt="certification"
              className={cn(!certification.claimed ? 'blur-[2px]' : '')}
            ></Image>
            {!certification.claimed && (
              <>
                <div className="absolute w-full h-full bg-black/10 rounded-[22px] flex justify-center items-center"></div>
                <div className="absolute  w-full flex py-[25px] bg-white/70 justify-center items-center top-1/2 -translate-y-1/2 text-[40px] font-next-poster-Bold tracking-[2.4px] text-[#131313]">
                  NOT CERTIFIED
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
          {certification.claimed && <GettingCertificate></GettingCertificate>}
        </div>
      </div>
    </Modal>
  );
});

const closeIcon = (
  <div className="absolute -top-[2px] -right-[2px] cursor-pointer">
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
