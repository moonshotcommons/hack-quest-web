'use client';
import Modal from '@/components/Common/Modal';
import Image from 'next/image';
import React, { useContext } from 'react';
import TrackTag from '@/components/Common/TrackTag';
import Button from '@/components/Common/Button';
import { useTranslation } from '@/i18n/client';
import { LangContext } from '@/components/Provider/Lang';
import { TransNs } from '@/i18n/config';
import { PartnerType } from '@/app/[lang]/(web)/(base page)/(resource)/partners/constants/type';
import { IoCloseCircle } from 'react-icons/io5';

interface PartnerCardModalProp {
  onClose: VoidFunction;
  open: boolean;
  partner: PartnerType;
}

const PartnerCardModal: React.FC<PartnerCardModalProp> = ({ onClose, open, partner }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.RESOURCE);
  return (
    <Modal
      open={open}
      onClose={onClose}
      showCloseIcon={true}
      icon={<IoCloseCircle size={20} />}
      iconClassName="right-[1rem] top-[1rem]"
    >
      <div className="w-[calc(100vw-2.5rem)] overflow-hidden rounded-[1rem] bg-neutral-white">
        <div className="relative h-[12.3125rem] w-full overflow-hidden bg-neutral-light-gray">
          {partner.img && <Image src={partner.img} alt={partner.name} fill className="object-cover" />}
        </div>
        <div className="flex flex-col justify-between gap-[1rem] p-[1.25rem]">
          <div className="flex flex-col gap-[.5rem]">
            <p className="body-m-bold text-neutral-off-black">{partner.name}</p>
            <div className="flex gap-[.25rem]">{partner.tags?.map((v) => <TrackTag track={v} key={v} />)}</div>
            <p className="body-xs text-neutral-medium-gray">{partner.description}</p>
          </div>
          <Button type="primary" className="button-text-s h-[2.125rem] w-full uppercase text-neutral-black">
            {t('learnMore')}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default PartnerCardModal;
