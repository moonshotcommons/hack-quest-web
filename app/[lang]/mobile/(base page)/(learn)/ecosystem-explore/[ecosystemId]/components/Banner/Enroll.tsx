'use client';
import Button from '@/components/Common/Button';
import React, { useState } from 'react';
import { Lang, TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';
import SwichModal from './SwichModal';
import { EcosystemDetailType } from '@/service/webApi/ecosystem/type';
import { AuthType, useUserStore } from '@/store/zustand/userStore';
import { useShallow } from 'zustand/react/shallow';
import webApi from '@/service';
import message from 'antd/es/message';
import { errorMessage } from '@/helper/ui';
import { useRedirect } from '@/hooks/router/useRedirect';
import MenuLink from '@/constants/MenuLink';

interface EnrollProp {
  lang: Lang;
  ecosystem: EcosystemDetailType;
}

const Enroll: React.FC<EnrollProp> = ({ lang, ecosystem }) => {
  const { t } = useTranslation(lang, TransNs.LEARN);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { redirectToUrl } = useRedirect();
  const { userInfo, setAuthModalOpen, setAuthType } = useUserStore(
    useShallow((state) => ({
      userInfo: state.userInfo,
      setAuthModalOpen: state.setAuthModalOpen,
      setAuthType: state.setAuthType
    }))
  );

  const handleAddEcosystem = () => {
    setLoading(true);
    webApi.ecosystemApi
      .switchEcosystem({
        ecosystemId: ecosystem.info?.id
      })
      .then(() => {
        message.success('success');
        setOpen(false);
        setTimeout(() => {
          redirectToUrl(MenuLink.SYSTEM);
        }, 1000);
      })
      .catch((err) => {
        errorMessage(err);
        setLoading(false);
      });
  };
  return (
    <>
      <Button
        type="primary"
        loading={loading}
        className={`button-text-m h-[3rem] w-full uppercase  ${ecosystem.info.enrolled ? 'cursor-not-allowed bg-neutral-light-gray text-neutral-medium-gray' : 'text-neutral-black '}`}
        onClick={() => {
          if (!userInfo) {
            setAuthModalOpen(true);
            setAuthType(AuthType.LOGIN);
            return;
          }
          if (ecosystem.info.enrolled) return;
          setOpen(true);
        }}
      >
        {t(ecosystem.info.enrolled ? 'explore.added' : 'explore.add')}
      </Button>
      <SwichModal
        open={open}
        handleSubmit={() => handleAddEcosystem()}
        onClose={() => setOpen(false)}
        ecosystem={ecosystem}
        loading={loading}
      />
    </>
  );
};

export default Enroll;
