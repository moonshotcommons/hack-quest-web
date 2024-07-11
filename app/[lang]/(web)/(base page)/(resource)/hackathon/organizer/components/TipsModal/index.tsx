'use client';
import Modal from '@/components/Common/Modal';
import React, { useContext } from 'react';
import { FiX } from 'react-icons/fi';
import { LangContext } from '@/components/Provider/Lang';
import { TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';
import Button from '@/components/Common/Button';
import Link from 'next/link';
import { ORGANIZATION_APPLY_LINK } from '../../../constants/data';

interface TipsModalProp {
  open: boolean;
  onClose: VoidFunction;
}

const TipsModal: React.FC<TipsModalProp> = ({ open, onClose }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  return (
    <Modal open={open} onClose={onClose} showCloseIcon={true} icon={<FiX size={26} />}>
      <div className="flex w-[572px] flex-col items-center  rounded-[16px] bg-neutral-white p-[40px]">
        <h2 className="text-h4 mb-[20px] text-neutral-black">{t('dashboard.tipsModalTitle')}</h2>
        <div className="body-m mb-[36px] text-neutral-rich-gray">{t('dashboard.tipsModalText')}</div>
        <div className="flex w-full justify-center gap-[12px]">
          <Button ghost className="button-text-m h-[48px] w-[165px] uppercase " onClick={onClose}>
            {t('cancel')}
          </Button>
          <Link href={ORGANIZATION_APPLY_LINK} target="_blank">
            <Button
              type="primary"
              className="button-text-m h-[48px] w-[165px] flex-shrink-0 uppercase "
              onClick={onClose}
            >
              {t('apply')}
            </Button>
          </Link>
        </div>
      </div>
    </Modal>
  );
};

export default TipsModal;
