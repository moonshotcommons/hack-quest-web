'use client';
import Button from '@/components/Common/Button';
import React, { useState } from 'react';
import { Lang, TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';
import SwichModal from './SwichModal';
import { EcosystemDetailType } from '@/service/webApi/ecosystem/type';
import { AuthType, useUserStore } from '@/store/zustand/userStore';
import { useShallow } from 'zustand/react/shallow';

interface EnrollProp {
  lang: Lang;
  ecosystem: EcosystemDetailType;
}

const Enroll: React.FC<EnrollProp> = ({ lang, ecosystem }) => {
  const { t } = useTranslation(lang, TransNs.LEARN);
  const [open, setOpen] = useState(false);
  const { userInfo, setAuthModalOpen, setAuthType } = useUserStore(
    useShallow((state) => ({
      userInfo: state.userInfo,
      setAuthModalOpen: state.setAuthModalOpen,
      setAuthType: state.setAuthType
    }))
  );

  const handleEnroll = () => {
    if (!userInfo) {
      setAuthModalOpen(true);
      setAuthType(AuthType.LOGIN);
      return;
    }
  };
  const handleSubmit = () => {};
  return (
    <>
      {false ? (
        <Button
          type="primary"
          onClick={handleEnroll}
          className="button-text-l h-[60px] w-[290px] uppercase text-neutral-black"
        >
          {t('explore.enroll')}
        </Button>
      ) : (
        <Button
          ghost
          className="button-text-l h-[60px] w-[290px] border-neutral-black uppercase text-neutral-black"
          onClick={() => {
            setOpen(true);
          }}
        >
          {t('explore.addEcosystem')}
        </Button>
      )}
      <SwichModal open={open} handleSubmit={handleSubmit} onClose={() => setOpen(false)} />
    </>
  );
};

export default Enroll;
