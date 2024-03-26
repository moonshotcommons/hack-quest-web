'use client';
import { FC, useContext, useRef } from 'react';
import Button from '@/components/Common/Button';
import WaitListModal, {
  WaitListModalInstance
} from '@/components/Web/Business/WaitListModal';
import { useUserStore } from '@/store/zustand/userStore';
import ConnectModal, {
  ConnectModalInstance
} from '@/components/Web/Business/ConnectModal';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import {
  LaunchPoolProjectType,
  LaunchPoolProjectStatus
} from '@/service/webApi/launchPool/type';

interface HandleButtonProps {
  project: LaunchPoolProjectType;
}

const HandleButton: FC<HandleButtonProps> = ({ project }) => {
  const waitListRef = useRef<WaitListModalInstance>(null);
  const connectModalRef = useRef<ConnectModalInstance>(null);
  const userInfo = useUserStore((state) => state.userInfo);
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LAUNCH_POOL);
  const renderButton = () => {
    switch (project.status) {
      case LaunchPoolProjectStatus.UPCOMING:
        return (
          <Button
            type="primary"
            className="button-text-l w-[270px] max-w-[270px] py-4 uppercase"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              waitListRef.current?.onJoin(userInfo?.email);
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
            className="button-text-l w-[270px] max-w-[270px] py-4 uppercase"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              connectModalRef.current?.onConnect();
            }}
          >
            {t('participateNow')}
          </Button>
        );
      case LaunchPoolProjectStatus.END:
        return (
          <Button
            ghost
            className="button-text-l w-[270px] max-w-[270px] py-4 uppercase"
          >
            {t('seeMore')}
          </Button>
        );
    }
  };
  return (
    <>
      {renderButton()}
      <WaitListModal ref={waitListRef} />
      <ConnectModal ref={connectModalRef} />
    </>
  );
};

export default HandleButton;
