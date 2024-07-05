'use client';
import React, { useContext } from 'react';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import Modal from '@/components/Common/Modal';
import { FiX } from 'react-icons/fi';
import Button from '@/components/Common/Button';

interface WarningModalProp {
  onClose: VoidFunction;
  open: boolean;
}

const WarningModal: React.FC<WarningModalProp> = ({ onClose, open }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  return (
    <Modal
      open={open}
      onClose={onClose}
      showCloseIcon={true}
      icon={<FiX size={26} />}
      iconClassName="right-[24px] top-[24px]"
    >
      <div className="flex  flex-col items-center rounded-[16px] bg-neutral-white px-[60px] pb-[24px] pt-[48px] shadow-[0_4px_8px_0_rgba(0,0,0,0.12)]">
        <p className="text-h4 mb-[36px] text-neutral-black">{t('hackathonDetail.submitWarning')}</p>
        <Button type="primary" className="h-[48px] w-[165px] uppercase" onClick={onClose}>
          ok
        </Button>
      </div>
    </Modal>
  );
};

export default WarningModal;
