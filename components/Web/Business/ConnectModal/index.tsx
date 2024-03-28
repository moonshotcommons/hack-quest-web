'use client';
import Modal from '@/components/Common/Modal';
import { ForwardRefRenderFunction, forwardRef, useImperativeHandle, useMemo, useState, useContext, useRef } from 'react';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { LuX } from 'react-icons/lu';
import ConnectWallet from './ConnectWallet';
import ConnectTwitter from './ConnectTwitter';
import ConnectDiscord from './ConnectDiscord';
import ConnectProgress from './ConnectProcess';
import Button from '@/components/Common/Button';
import EnterInviteCode from './EnterInviteCode';
import { useRequest } from 'ahooks';
import webApi from '@/service';
import { ConnectType } from '@/service/webApi/user/type';
import { ParticipationStatus } from './constant';
import { errorMessage } from '@/helper/ui';
import ParticipationSuccess from './ParticipationSuccess';
import { cn } from '@/helper/utils';

interface ConnectModalProps {}

export interface ConnectModalInstance {
  onConnect: (id: string) => void;
}

const ConnectModal: ForwardRefRenderFunction<ConnectModalInstance, ConnectModalProps> = (props, ref) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LAUNCH_POOL);
  const [open, setOpen] = useState(false);
  const [currentConnectType, setCurrentConnectType] = useState<ConnectType | ParticipationStatus>(ConnectType.WALLET);
  const projectId = useRef<string>();

  // 四种连接类型的连接状态以及连接信息
  const [connectState, setConnectState] = useState([
    {
      type: ConnectType.WALLET,
      isConnect: false,
      connectInfo: {}
    },
    {
      type: ConnectType.TWITTER,
      isConnect: false,
      connectInfo: {}
    },
    {
      type: ConnectType.DISCORD,
      isConnect: false,
      connectInfo: {}
    },
    {
      type: ParticipationStatus.INVITE_CODE,
      isConnect: false,
      connectInfo: {}
    }
  ]);

  // 当前连接类型的连接状态
  const currentConnectState = useMemo(() => {
    return connectState.find((item) => item.type === currentConnectType);
  }, [connectState, currentConnectType]);

  // 获取和刷新
  const { run: getConnectState, refreshAsync } = useRequest(
    async (isInit: boolean = false) => {
      const [connectInfo, twitterFollow, discordJoin, participateInfo] = await Promise.all([
        await webApi.userApi.getConnectInfo(),
        await webApi.userApi.checkTwitterFollow(),
        await webApi.userApi.checkDiscordJoin(),
        await webApi.launchPoolApi.getParticipateInfo(projectId.current!)
      ]);

      return { connectInfo, isInit, isParticipate: participateInfo.isParticipate, twitterFollow, discordJoin };
    },
    {
      manual: true,
      onSuccess({ connectInfo, isInit, isParticipate, twitterFollow, discordJoin }) {
        const newConnectState = connectState.map((connectItem) => {
          let itemInfo = connectInfo.find((item) => item.thirdPartyName === connectItem.type) || {};
          let isConnect = connectItem.isConnect;

          switch (connectItem.type) {
            case ParticipationStatus.INVITE_CODE:
              return { ...connectItem, isConnect: isParticipate };
            case ConnectType.TWITTER:
              isConnect = !!itemInfo && twitterFollow.isFollow;
              itemInfo = { ...itemInfo, isFollow: twitterFollow.isFollow };
              break;
            case ConnectType.DISCORD:
              isConnect = !!itemInfo && discordJoin.isJoin;
              itemInfo = { ...itemInfo, isJoin: discordJoin.isJoin };
              break;
            default:
              isConnect = !!itemInfo;
              break;
          }

          return {
            ...connectItem,
            isConnect,
            connectInfo: itemInfo
          };
        });

        // 初始化的时候设置第一个未连接的类型
        if (isInit) {
          const currConnectType = newConnectState.find((item) => !item.isConnect)?.type;
          // 如果都连接了，直接显示成功弹框
          if (!currConnectType) {
            setCurrentConnectType(ParticipationStatus.SUCCESS);
          } else {
            setCurrentConnectType(currConnectType);
          }
        }

        setConnectState(newConnectState);
      },
      onError(err) {
        errorMessage(err);
      }
    }
  );

  useImperativeHandle(
    ref,
    () => {
      return {
        onConnect(id: string) {
          projectId.current = id;
          getConnectState(true);
          setOpen(true);
        }
      };
    },
    []
  );

  const reset = () => {
    setTimeout(() => {}, 500);
  };

  const SlotComponent = useMemo(() => {
    switch (currentConnectType) {
      case ConnectType.WALLET:
        return <ConnectWallet refreshConnectState={refreshAsync} connectState={connectState[0]} />;
      case ConnectType.TWITTER:
        return <ConnectTwitter refreshConnectState={refreshAsync} connectState={connectState[1]} />;
      case ConnectType.DISCORD:
        return <ConnectDiscord refreshConnectState={refreshAsync} connectState={connectState[2]} />;
      case ParticipationStatus.INVITE_CODE:
        return <EnterInviteCode refreshConnectState={refreshAsync} connectState={connectState[3]} />;
      case ParticipationStatus.SUCCESS:
        return <ParticipationSuccess />;
    }
  }, [currentConnectType, refreshAsync, connectState]);

  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
        reset();
      }}
      showCloseIcon
      icon={
        <LuX
          size={24}
          className="absolute right-2 top-2 text-neutral-off-black"
          onClick={() => {
            setOpen(false);
            reset();
          }}
        />
      }
    >
      <div className="flex h-[600px] w-[1000px] max-w-[1000px] flex-col justify-between rounded-[2rem] border border-neutral-light-gray bg-neutral-white p-12">
        <div className="flex flex-1 flex-col">
          {currentConnectType !== ParticipationStatus.SUCCESS && (
            <div>
              <ConnectProgress connectType={currentConnectType} />
            </div>
          )}
          <div className="flex-1">{SlotComponent}</div>
        </div>
        {![ParticipationStatus.SUCCESS, ParticipationStatus.INVITE_CODE].includes(currentConnectType as any) && (
          <Button
            type="primary"
            className={cn(
              'button-text-l w-[270px] self-end py-4 uppercase text-neutral-black opacity-100',
              !currentConnectState?.isConnect ? 'bg-neutral-light-gray text-neutral-medium-gray' : ''
            )}
            disabled={!currentConnectState?.isConnect}
            onClick={() => {
              const currentIndex = connectState.findIndex((item) => item.type === currentConnectState!.type);
              if (currentIndex + 1 < connectState.length) {
                setCurrentConnectType(connectState[currentIndex + 1].type);
              }
            }}
          >
            {t('continue')}
          </Button>
        )}
      </div>
    </Modal>
  );
};

export default forwardRef(ConnectModal);
