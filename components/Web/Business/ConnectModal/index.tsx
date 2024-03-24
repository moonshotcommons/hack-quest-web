'use client';
import Modal from '@/components/Common/Modal';
import {
  ForwardRefRenderFunction,
  forwardRef,
  useImperativeHandle,
  useMemo,
  useState,
  useContext
} from 'react';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { LuX } from 'react-icons/lu';
import ConnectWallet from './ConnectWallet';
import ConnectTwitter from './ConnectTwitter';
import ConnectDiscord from './ConnectDiscord';
import ConnectProgress from './ConnectProcess';
import { ConnectType } from './constant';
import Button from '@/components/Common/Button';
import EnterInviteCode from './EnterInviteCode';

interface ConnectModalProps {}

export interface ConnectModalInstance {
  onConnect: () => void;
}

const ConnectModal: ForwardRefRenderFunction<
  ConnectModalInstance,
  ConnectModalProps
> = (props, ref) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LAUNCH_POOL);
  const [open, setOpen] = useState(false);
  const [currentConnectType, setCurrentConnectType] = useState(
    ConnectType.WALLET
  );

  useImperativeHandle(
    ref,
    () => {
      return {
        onConnect() {
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
        return <ConnectWallet />;
      case ConnectType.TWITTER:
        return <ConnectTwitter />;
      case ConnectType.DISCORD:
        return <ConnectDiscord />;
      case ConnectType.INVITE_CODE:
        return <EnterInviteCode />;
    }
  }, [currentConnectType]);

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
        <div>
          <div>
            <ConnectProgress connectType={currentConnectType} />
          </div>
          <div>{SlotComponent}</div>
        </div>
        <Button
          type="primary"
          className="button-text-l w-[270px] self-end py-4 uppercase"
        >
          {t('continue')}
        </Button>
      </div>
    </Modal>
  );
};

export default forwardRef(ConnectModal);
