'use client';
import { FC, useContext } from 'react';
import { ProjectStatus } from '.';
import Button from '@/components/Common/Button';

import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { useGlobalStore } from '@/store/zustand/globalStore';
import { NavType } from '@/components/Mobile/MobLayout/constant';

interface HandleButtonProps {
  status: ProjectStatus;
}

const HandleButton: FC<HandleButtonProps> = ({ status }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LAUNCH_POOL);
  const mobileNavModalToggleOpenHandle = useGlobalStore(
    (state) => state.mobileNavModalToggleOpenHandle
  );

  const renderButton = () => {
    switch (status) {
      case ProjectStatus.UPCOMING:
        return (
          <Button
            type="primary"
            block
            className="button-text-l  py-4 uppercase"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              mobileNavModalToggleOpenHandle.setNavType(NavType.JOIN_WAIT_LIST);
              mobileNavModalToggleOpenHandle.toggleOpen();
            }}
          >
            {t('joinWaitlist')}
          </Button>
        );
      case ProjectStatus.LIVE_NOW:
        return (
          <Button
            type="primary"
            block
            className="button-text-l  py-4 uppercase"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              mobileNavModalToggleOpenHandle.setNavType(NavType.CONNECT);
              mobileNavModalToggleOpenHandle.toggleOpen();
            }}
          >
            {t('participateNow')}
          </Button>
        );
      case ProjectStatus.CLOSED:
        return (
          <Button ghost block className="button-text-l  py-4 uppercase">
            {t('seeMore')}
          </Button>
        );
    }
  };
  return <>{renderButton()}</>;
};

export default HandleButton;
