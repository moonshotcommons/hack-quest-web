'use client';
import { ConnectButton as RainbowConnectButton } from '@rainbow-me/rainbowkit';
import { AuthType, useUserStore } from '@/store/zustand/userStore';
import { useShallow } from 'zustand/react/shallow';
import { FC, useEffect, useState } from 'react';
import Button from '@/components/Common/Button';
import Image from 'next/image';

export interface ConnectButtonProps {
  // wallet: string | undefined;
  // projectId: string | undefined;
  form: any;
  // status: ProjectSubmitStepType;
  // refreshProjectInfo: VoidFunction;
  // onDisconnect: VoidFunction;
}

export const ConnectButton: FC<ConnectButtonProps> = ({ form }) => {
  const [bindPending, setBindPending] = useState(false);
  const userInfo = useUserStore((state) => state.userInfo);
  const [wallet, setWallet] = useState(form.getValues('wallet'));
  const { setAuthType, setUserInfo, setAuthModalOpen } = useUserStore(
    useShallow((state) => ({
      setAuthType: state.setAuthType,
      setUserInfo: state.setUserInfo,
      setAuthModalOpen: state.setAuthModalOpen
    }))
  );

  useEffect(() => {
    setTimeout(() => {
      setWallet(form.getValues('wallet'));
    });
  }, [form.getValues('wallet')]);

  return (
    <RainbowConnectButton.Custom>
      {({ account, chain, openAccountModal, openChainModal, openConnectModal, authenticationStatus, mounted }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready && account && chain && (!authenticationStatus || authenticationStatus === 'authenticated');
        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none'
              }
            })}
          >
            {(() => {
              // 未登录状态，弹登录框
              // 未绑定钱包，钱包已连接
              // 未绑定钱包，钱包未连接
              if (!wallet) {
                if (bindPending && connected) {
                  // bindWallet(account.address as `0x${string}`);
                  setWallet(account.address as `0x${string}`);
                  form.setValue('wallet', account.address as `0x${string}`);
                  form.trigger('wallet');
                  setBindPending(false);
                }
                return connectButtonRender({
                  openConnectModal,
                  account,
                  connected,
                  authenticationStatus
                });
              }
              return disconnectButtonRender(authenticationStatus);
            })()}
          </div>
        );
      }}
    </RainbowConnectButton.Custom>
  );

  function disconnectButtonRender(authenticationStatus: any) {
    return (
      <Button
        htmlType="button"
        block
        className="flex justify-center gap-2 rounded-[16px] border border-dashed border-neutral-light-gray p-5 text-neutral-medium-gray hover:scale-100 [&>span]:inline-block [&>span]:w-full"
        loading={authenticationStatus === 'loading'}
        disabled={authenticationStatus === 'loading'}
        onClick={() => {
          // onDisconnect();
          setWallet('');
          form.setValue('wallet', '');
          form.trigger('wallet');
        }}
      >
        <div className="flex h-full w-full items-center justify-between">
          <span className="body-l flex items-center gap-2 text-neutral-off-black">
            <Image src={'/images/login/metamask.svg'} alt="wallet" width={30} height={30} />
            <span>{wallet?.toString()?.replace(/(.{15})(.*)(.{4})/, '$1...$3')}</span>
          </span>
          <span className="underline-m flex cursor-pointer items-center text-neutral-rich-gray">
            <Image src={'/images/icons/disconnect.svg'} alt="disconnect" width={24} height={24} />
            <span className="ml-1">Disconnect</span>
          </span>
        </div>
      </Button>
    );
  }

  function connectButtonRender({
    openConnectModal,
    account,
    connected,
    authenticationStatus
  }: {
    openConnectModal: Function;
    account: any;
    connected?: boolean;
    authenticationStatus?: string;
  }) {
    return (
      <Button
        htmlType="button"
        block
        className="px-0 py-0 hover:scale-[1.02] [&>span]:flex [&>span]:w-full"
        loading={authenticationStatus === 'loading'}
        disabled={authenticationStatus === 'loading'}
        onClick={() => {
          if (!userInfo) {
            setAuthModalOpen(true);
            setAuthType(AuthType.LOGIN);
            return;
          }

          if (connected) {
            setWallet(account.address as `0x${string}`);
            form.setValue('wallet', account.address as `0x${string}`);
            form.trigger('wallet');
          } else {
            setBindPending(true);
            openConnectModal();
          }
        }}
      >
        <span className="flex w-full items-center justify-center gap-2 rounded-[16px] border border-dashed border-neutral-light-gray p-5 text-neutral-medium-gray">
          <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2 12.5C2 6.97715 6.47715 2.5 12 2.5C14.6522 2.5 17.1957 3.55357 19.0711 5.42893C20.9464 7.3043 22 9.84784 22 12.5C22 18.0228 17.5228 22.5 12 22.5C6.47715 22.5 2 18.0228 2 12.5ZM13 13.5H17C17.5523 13.5 18 13.0523 18 12.5C18 11.9477 17.5523 11.5 17 11.5H13V7.5C13 6.94772 12.5523 6.5 12 6.5C11.4477 6.5 11 6.94772 11 7.5V11.5H7C6.44772 11.5 6 11.9477 6 12.5C6 13.0523 6.44772 13.5 7 13.5H11V17.5C11 18.0523 11.4477 18.5 12 18.5C12.5523 18.5 13 18.0523 13 17.5V13.5Z"
              fill="#8C8C8C"
            />
          </svg>
          <span>Connect A New Wallet</span>
        </span>
      </Button>
    );
  }
};
