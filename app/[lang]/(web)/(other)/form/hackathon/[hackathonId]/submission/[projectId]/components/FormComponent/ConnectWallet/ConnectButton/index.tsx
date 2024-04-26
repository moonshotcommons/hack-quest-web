'use client';
import { ConnectButton as RainbowConnectButton } from '@rainbow-me/rainbowkit';
import { AuthType, useUserStore } from '@/store/zustand/userStore';
import { useShallow } from 'zustand/react/shallow';
import webApi from '@/service';
import { errorMessage } from '@/helper/ui';
import { useRequest } from 'ahooks';
import { useState } from 'react';
import Button from '@/components/Common/Button';
import { ThirdPartyMediaType } from '@/helper/thirdPartyMedia';
import { message } from 'antd';
import Image from 'next/image';

export interface ConnectButtonProps {}

export const ConnectButton = (props: ConnectButtonProps) => {
  const [bindPending, setBindPending] = useState(false);
  const userInfo = useUserStore((state) => state.userInfo);

  const connectState = {
    isConnect: false,
    connectInfo: {
      username: '0xdwqwef'
    }
  };

  const { setAuthType, setUserInfo, setAuthModalOpen } = useUserStore(
    useShallow((state) => ({
      setAuthType: state.setAuthType,
      setUserInfo: state.setUserInfo,
      setAuthModalOpen: state.setAuthModalOpen
    }))
  );

  const { run: bindWallet, loading: connectLoading } = useRequest(
    async (address: `0x${string}`) => {
      await webApi.userApi.connectWallet(address);
      // await refreshConnectState();
    },
    {
      manual: true,
      onSuccess() {
        message.success(`Connect the wallet successfully`);
      }
    }
  );

  const { run: disconnect, loading: disConnectLoading } = useRequest(
    async () => {
      await webApi.userApi.disconnect(ThirdPartyMediaType.WALLET);
      // await refreshConnectState();
    },
    {
      manual: true,
      onSuccess() {
        message.success(`Disconnect the wallet successfully`);
      },
      onError(err) {
        errorMessage(err);
      }
    }
  );

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

              if (!connectState.isConnect) {
                if (bindPending && connected) {
                  bindWallet(account.address as `0x${string}`);
                  setBindPending(false);
                }
                return (
                  <Button
                    block
                    className="px-0 py-0 [&>span]:flex [&>span]:w-full"
                    loading={authenticationStatus === 'loading' || connectLoading}
                    disabled={authenticationStatus === 'loading' || connectLoading}
                    onClick={() => {
                      if (!userInfo) {
                        setAuthModalOpen(true);
                        setAuthType(AuthType.LOGIN);
                        return;
                      }

                      if (connected) {
                        bindWallet(account.address as `0x${string}`);
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

              return (
                <Button
                  className="flex justify-center gap-2 rounded-[16px] border border-dashed border-neutral-light-gray p-5 text-neutral-medium-gray"
                  loading={authenticationStatus === 'loading' || connectLoading}
                  disabled={authenticationStatus === 'loading' || connectLoading}
                  onClick={() => {
                    disconnect();
                  }}
                >
                  <span className="flex items-center gap-2">
                    <Image src={'/images/login/metamask.svg'} alt="wallet" width={30} height={30} />
                    <span>{connectState.connectInfo.username}</span>
                  </span>
                  <span>Disconnect</span>
                </Button>
              );
            })()}
          </div>
        );
      }}
    </RainbowConnectButton.Custom>
  );
};