'use client';
import { FC, useContext } from 'react';
import Button from '@/components/Common/Button';

import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { useGlobalStore } from '@/store/zustand/globalStore';
import { NavType } from '@/components/Mobile/MobLayout/constant';
import { LaunchPoolProjectType, LaunchPoolProjectStatus } from '@/service/webApi/launchPool/type';
import { useUserStore } from '@/store/zustand/userStore';

interface HandleButtonProps {
  project: LaunchPoolProjectType;
}

const HandleButton: FC<HandleButtonProps> = ({ project }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LAUNCH_POOL);
  const mobileNavModalToggleOpenHandle = useGlobalStore((state) => state.mobileNavModalToggleOpenHandle);
  const userInfo = useUserStore((state) => state.userInfo);

  const renderButton = () => {
    switch (project.status) {
      case LaunchPoolProjectStatus.UPCOMING:
        return (
          <Button
            type="primary"
            block
            className="button-text-l  py-4 uppercase"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              mobileNavModalToggleOpenHandle.setNavType(NavType.JOIN_WAIT_LIST);
              mobileNavModalToggleOpenHandle.setModuleProps({ email: userInfo?.email });
              mobileNavModalToggleOpenHandle.toggleOpen();
            }}
          >
            {t('joinWaitlist')}
          </Button>
        );
      case LaunchPoolProjectStatus.FUELING:
      case LaunchPoolProjectStatus.AIRDROP:
      case LaunchPoolProjectStatus.ALLOCATION:
        return (
          <Button
            type="primary"
            block
            className="button-text-l  py-4 uppercase"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              if (!userInfo) {
                mobileNavModalToggleOpenHandle.setNavType(NavType.AUTH);
                mobileNavModalToggleOpenHandle.toggleOpen();
                return;
              }
              mobileNavModalToggleOpenHandle.setNavType(NavType.CONNECT);
              mobileNavModalToggleOpenHandle.setModuleProps({ projectId: project.id });
              mobileNavModalToggleOpenHandle.toggleOpen();
            }}
          >
            {t('participateNow')}
          </Button>
        );
      case LaunchPoolProjectStatus.END:
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
