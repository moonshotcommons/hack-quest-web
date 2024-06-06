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
      <div className="flex w-[572px] flex-col items-center  rounded-[16px] bg-neutral-white p-[40px] pt-[80px]">
        {/* <h2 className="text-h4 mb-[20px] text-neutral-black"> {t('hackathonVoting.tipsModalTitle')}</h2> */}
        <div className="body-m mb-[36px] text-neutral-rich-gray">
          <div>{t('hackathonVoting.tipsModalTitle')}</div>
          <div className="my-[6px]">
            <div>
              <span className="body-m-bold">{t('hackathonVoting.tipsModalTitle1')}</span>
              <span>{t('hackathonVoting.tipsModaltext1')}</span>
            </div>
            <div>
              <span className="body-m-bold">{t('hackathonVoting.tipsModalTitle2')}</span>
              <span>{t('hackathonVoting.tipsModaltext2')}</span>
            </div>
            <div>
              <span className="body-m-bold">{t('hackathonVoting.tipsModalTitle3')}</span>
              <span>{t('hackathonVoting.tipsModaltext3')}</span>
            </div>
            <div>
              <span className="body-m-bold">{t('hackathonVoting.tipsModalTitle4')}</span>
              <span>{t('hackathonVoting.tipsModaltext4')}</span>
            </div>
          </div>
          <div>{t('hackathonVoting.tipsModalTitle5')}</div>
        </div>
        <div className="flex w-full gap-[12px]">
          <Button
            type="primary"
            className="button-text-m h-[48px] flex-1 flex-shrink-0 uppercase "
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
