'use client';
import { ConnectButton as RainbowConnectButton } from '@rainbow-me/rainbowkit';
import { TFunction } from 'i18next';
import { AuthType, useUserStore } from '@/store/zustand/userStore';
import { useShallow } from 'zustand/react/shallow';
import { useRedirect } from '@/hooks/router/useRedirect';
import webApi from '@/service';
import { errorMessage } from '@/helper/ui';
import { useRequest } from 'ahooks';
import { useState } from 'react';
import Button from '@/components/Common/Button';
import { WalletConnectState } from '..';
import { ThirdPartyMediaType } from '@/helper/thirdPartyMedia';
import { message } from 'antd';

export interface ConnectButtonProps {
  t: TFunction;
  connectState: WalletConnectState;
  refreshConnectState: () => Promise<unknown>;
}

export const ConnectButton = ({ t, connectState, refreshConnectState }: ConnectButtonProps) => {
  const [bindPending, setBindPending] = useState(false);

  const { redirectToUrl } = useRedirect();
  const userInfo = useUserStore((state) => state.userInfo);

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
      await refreshConnectState();
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
      await refreshConnectState();
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
        const connected = ready && account && chain && (!authenticationStatus || authenticationStatus === 'authenticated');
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

              if (!userInfo) {
                setAuthModalOpen(true);
                setAuthType(AuthType.LOGIN);
                return;
              }

              // 未绑定钱包，钱包已连接

              // 未绑定钱包，钱包未连接

              if (!connectState.isConnect) {
                if (bindPending && connected) {
                  bindWallet(account.address as `0x${string}`);
                  setBindPending(false);
                }
                return (
                  <Button
                    type="primary"
                    className="button-text-l w-[270px] px-0 py-4 font-medium uppercase text-neutral-black"
                    loading={authenticationStatus === 'loading' || connectLoading}
                    disabled={authenticationStatus === 'loading' || connectLoading}
                    onClick={() => {
                      if (connected) {
                        bindWallet(account.address as `0x${string}`);
                      } else {
                        setBindPending(true);
                        openConnectModal();
                      }
                    }}
                  >
                    {t('connectWallet')}
                  </Button>
                );
              }

              return (
                // <div style={{ display: 'flex', gap: 12 }}>
                //   <button
                //     onClick={openChainModal}
                //     style={{ display: 'flex', alignItems: 'center' }}
                //     type="button"
                //   >
                //     {chain.hasIcon && (
                //       <div
                //         style={{
                //           background: chain.iconBackground,
                //           width: 12,
                //           height: 12,
                //           borderRadius: 999,
                //           overflow: 'hidden',
                //           marginRight: 4
                //         }}
                //       >
                //         {chain.iconUrl && (
                //           <Image
                //             alt={chain.name ?? 'Chain icon'}
                //             src={chain.iconUrl}
                //             width={12}
                //             height={12}
                //           />
                //         )}
                //       </div>
                //     )}
                //     {chain.name}
                //   </button>
                //   <button onClick={openAccountModal} type="button">
                //     {account.displayName}
                //     {account.displayBalance
                //       ? ` (${account.displayBalance})`
                //       : ''}
                //   </button>
                // </div>
                <div className="flex items-center gap-6">
                  <span className="body-l-bold text-neutral-rich-gray">Address: {connectState.connectInfo.username}</span>
                  <span className="flex items-center gap-1">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M14.4881 3.78628L5.82143 13.1196C5.69578 13.2551 5.51954 13.3323 5.33476 13.3329C5.15756 13.334 4.98724 13.2644 4.86143 13.1396L1.52809 9.80628C1.26668 9.54486 1.26668 9.12102 1.52809 8.85961C1.78951 8.59819 2.21334 8.59819 2.47476 8.85961L5.33476 11.7063L13.5148 2.87961C13.6717 2.68612 13.9233 2.59625 14.1673 2.64659C14.4113 2.69693 14.6068 2.87908 14.6743 3.11887C14.7418 3.35866 14.67 3.61607 14.4881 3.78628Z"
                        fill="#06884A"
                      />
                    </svg>

                    <span className="body-m-bold text-status-success-dark">Connected</span>
                  </span>
                  <Button
                    ghost
                    className="button-text-s h-[34px] w-[140px] border-neutral-black px-0 py-0 text-neutral-black"
                    loading={disConnectLoading}
                    disabled={disConnectLoading}
                    onClick={() => {
                      disconnect();
                    }}
                  >
                    Disconnect
                  </Button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </RainbowConnectButton.Custom>
  );
};
