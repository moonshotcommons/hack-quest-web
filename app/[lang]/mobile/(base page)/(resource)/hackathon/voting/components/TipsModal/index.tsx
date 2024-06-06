'use client';
import Modal from '@/components/Common/Modal';
import React, { useContext, useEffect, useState } from 'react';
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
    <Modal open={open} onClose={() => setOpen(false)}>
      <div className="flex w-full flex-col items-center  rounded-[16px] bg-neutral-white px-[1.25rem] py-[1.875rem]">
        {/* <h2 className="text-h4 mb-[20px] text-neutral-black"> {t('hackathonVoting.tipsModalTitle')}</h2> */}
        <p className="body-s mb-[2.25rem] whitespace-pre-line text-neutral-rich-gray">
          {t('hackathonVoting.tipsModalText')}
        </p>
        <div className="flex w-full gap-[12px]">
          <Button
            type="primary"
            className="button-text-m h-[3rem] flex-1 flex-shrink-0 uppercase "
            onClick={() => setOpen(false)}
          >
            {t('confirm')}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default TipsModal;
