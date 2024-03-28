'use client';
import { FC, useContext, useEffect, useRef, useState } from 'react';
import Button from '@/components/Common/Button';
import WaitListModal, { WaitListModalInstance } from '@/components/Web/Business/WaitListModal';
import { AuthType, useUserStore } from '@/store/zustand/userStore';
import ConnectModal, { ConnectModalInstance } from '@/components/Web/Business/ConnectModal';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { LaunchPoolProjectType, LaunchPoolProjectStatus } from '@/service/webApi/launchPool/type';
import { useRequest } from 'ahooks';
import webApi from '@/service';
import { errorMessage } from '@/helper/ui';

interface HandleButtonProps {
  project: LaunchPoolProjectType;
}

const HandleButton: FC<HandleButtonProps> = ({ project }) => {
  const waitListRef = useRef<WaitListModalInstance>(null);
  const connectModalRef = useRef<ConnectModalInstance>(null);

  const userInfo = useUserStore((state) => state.userInfo);
  const setAuthType = useUserStore((state) => state.setAuthType);
  const setAuthModalOpen = useUserStore((state) => state.setAuthModalOpen);

  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LAUNCH_POOL);

  const [joined, setJoined] = useState(false);

  const { run, refreshAsync } = useRequest(
    async () => {
      return webApi.launchPoolApi.checkJoinWaitList(project.id);
    },
    {
      manual: true,
      onSuccess(res) {
        if (res?.isJoin) {
          setJoined(true);
        }
      },
      onError(err) {
        errorMessage(err);
      }
    }
  );

  useEffect(() => {
    if (userInfo) run();
  }, [run, userInfo]);

  const renderButton = () => {
    switch (project.status) {
      case LaunchPoolProjectStatus.UPCOMING:
        return (
          <>
            {!joined && (
              <Button
                type="primary"
                className="button-text-l w-[270px] max-w-[270px] py-4 uppercase"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  if (!userInfo) {
                    setAuthType(AuthType.LOGIN);
                    setAuthModalOpen(true);
                    return;
                  }
                  waitListRef.current?.onJoin(project.id, refreshAsync, '');
                }}
              >
                {t('joinWaitlist')}
              </Button>
            )}
            {joined && (
              <Button
                ghost
                className="button-text-l w-[270px] max-w-[270px] py-4 uppercase"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
              >
                {t('waitListJoined')}
              </Button>
            )}
          </>
        );
      case LaunchPoolProjectStatus.FUELING:
      case LaunchPoolProjectStatus.AIRDROP:
      case LaunchPoolProjectStatus.END:
        return (
          <Button
            type="primary"
            className="button-text-l w-[270px] max-w-[270px] py-4 uppercase"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              if (!userInfo) {
                setAuthType(AuthType.LOGIN);
                setAuthModalOpen(true);
                return;
              }
              connectModalRef.current?.onConnect(project.id);
            }}
          >
            {t('participateNow')}
          </Button>
        );
      // case LaunchPoolProjectStatus.END:
      //   return (
      //     <Button ghost className="button-text-l w-[270px] max-w-[270px] py-4 uppercase">
      //       {t('seeMore')}
      //     </Button>
      //   );
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
