'use client';
import Modal from '@/components/Common/Modal';
import React, { useContext, useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { LangContext } from '@/components/Provider/Lang';
import { TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';
import Button from '@/components/Common/Button';

interface TipsModalProp {}

const TipsModal: React.FC<TipsModalProp> = () => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem('isFirstVote')) {
      setOpen(true);
      localStorage.setItem('isFirstVote', '1');
    } else {
      setOpen(false);
    }
  }, []);
  return (
    <Modal open={open} onClose={() => setOpen(false)} showCloseIcon={true} icon={<FiX size={26} />}>
      <div className="flex w-[572px] flex-col items-center  rounded-[16px] bg-neutral-white p-[40px]">
        <h2 className="text-h4 mb-[20px] text-neutral-black"> {t('hackathonVoting.tipsModalTitle')}</h2>
        <p className="body-m mb-[36px] text-neutral-rich-gray">{t('hackathonVoting.tipsModalText')}</p>
        <div className="flex w-full gap-[12px]">
          <Button
            ghost
            className="button-text-m h-[48px] flex-1 flex-shrink-0 border-neutral-black uppercase "
            onClick={() => setOpen(false)}
          >
            {t('hackathonVoting.decline')}
          </Button>
          <Button type="primary" className="button-text-m h-[48px] flex-1 flex-shrink-0 uppercase ">
            {t('confirm')}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default TipsModal;
