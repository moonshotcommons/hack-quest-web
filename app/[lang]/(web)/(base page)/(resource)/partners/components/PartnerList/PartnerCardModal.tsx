'use client';
import Modal from '@/components/Common/Modal';
import React, { useContext } from 'react';
import { FiX } from 'react-icons/fi';
import TrackTag from '@/components/Common/TrackTag';
import Button from '@/components/Common/Button';
import { useTranslation } from '@/i18n/client';
import { LangContext } from '@/components/Provider/Lang';
import { TransNs } from '@/i18n/config';
import { PartnerShipType } from '@/service/webApi/resourceStation/type';
import BaseImage from '@/components/Common/BaseImage';

interface PartnerCardModalProp {
  onClose: VoidFunction;
  open: boolean;
  partner: PartnerShipType;
}

const PartnerCardModal: React.FC<PartnerCardModalProp> = ({ onClose, open, partner }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.RESOURCE);
  return (
    <Modal
      open={open}
      onClose={onClose}
      showCloseIcon={true}
      icon={<FiX size={26} />}
      iconClassName="right-[24px] top-[24px]"
    >
      <div className="flex h-[338px] w-[1022px] overflow-hidden rounded-[16px] bg-neutral-white">
        <div className="relative h-full w-[605px] overflow-hidden bg-neutral-light-gray p-[30px]">
          <BaseImage src={partner.logo} alt={partner.name} className="h-full w-full" contain={true} />
        </div>
        <div className="flex h-full flex-1 flex-col justify-between px-[20px] py-[40px]">
          <div className="flex flex-col gap-[8px]">
            <p className="body-l-bold text-neutral-off-black">{partner.name}</p>
            <div className="flex gap-[8px]">{partner.tags?.map((v) => <TrackTag track={v} key={v} />)}</div>
            <p className="body-s text-neutral-medium-gray">{partner.description}</p>
          </div>
          <Button type="primary" className="button-text-m h-[48px] w-full uppercase text-neutral-black">
            {t('learnMore')}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default PartnerCardModal;
