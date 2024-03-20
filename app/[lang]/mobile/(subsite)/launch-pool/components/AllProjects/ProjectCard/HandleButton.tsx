'use client';
import { FC, useContext, useRef } from 'react';
import { ProjectStatus } from '.';
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

interface HandleButtonProps {
  status: ProjectStatus;
}

const HandleButton: FC<HandleButtonProps> = ({ status }) => {
  const waitListRef = useRef<WaitListModalInstance>(null);
  const connectModalRef = useRef<ConnectModalInstance>(null);
  const userInfo = useUserStore((state) => state.userInfo);
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LAUNCH_POOL);

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
              waitListRef.current?.onJoin(userInfo?.email);
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
              connectModalRef.current?.onConnect();
            }}
          >
            {t('participateNow')}
          </Button>
        );
      case ProjectStatus.CLOSED:
        return (
          <Button ghost block className="button-text-l  py-4 uppercase">
            {t('participateNow')}
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
