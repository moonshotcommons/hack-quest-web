import Button from '@/components/Common/Button';
import { BurialPoint } from '@/helper/burialPoint';
import { setToken } from '@/helper/user-token';
import useIsPc from '@/hooks/utils/useIsPc';
import { useRedirect } from '@/hooks/router/useRedirect';
// import Metamask from '@/public/images/login/metamask.svg';
import Okx from '@/public/images/login/okx.png';
import webApi from '@/service';
import { LoginResponse, ThirdPartyAuthType } from '@/service/webApi/user/type';
import { useRequest } from 'ahooks';
import message from 'antd/es/message';
import { omit } from 'lodash-es';
import Image from 'next/image';
import React, { useState } from 'react';
import { AuthType, useUserStore } from '@/store/zustand/userStore';
import { useShallow } from 'zustand/react/shallow';
import { useGlobalStore } from '@/store/zustand/globalStore';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useRouter } from 'next/navigation';
interface MetamaskLoginButtonProps {}

const MetamaskLoginButton: React.FC<MetamaskLoginButtonProps> = (props) => {
  const isPc = useIsPc();
  const { redirectToUrl } = useRedirect();
  const userInfo = useUserStore((state) => state.userInfo);
  const router = useRouter();
  const { setAuthType, setUserInfo, setAuthModalOpen } = useUserStore(
    useShallow((state) => ({
      setAuthType: state.setAuthType,
      setUserInfo: state.setUserInfo,
      setAuthModalOpen: state.setAuthModalOpen
    }))
  );

  const setTipsModalOpenState = useGlobalStore((state) => state.setTipsModalOpenState);

  const { run: skipInviteCode, loading: skipInviteCodeLoading } = useRequest(
    async (token: string) => {
      const res = await webApi.userApi.activateUser(token);
      return res;
    },
    {
      onSuccess(res: any) {
        setUserInfo(omit(res, 'token') as Omit<LoginResponse, 'token'>);
        BurialPoint.track('signup-Google三方登录输入邀请码登录成功');
        setToken(res.token);
        setAuthModalOpen(false);
        router.refresh();
        redirectToUrl('/dashboard');
      },
      onError(e: any) {
        let msg = '';
        if (e.msg) {
          message.error(e.msg);
          msg = e.msg;
        } else {
          message.error(e.message);
          msg = e.message;
        }
      },

      manual: true,
      debounceWait: 500
    }
  );

  // const { connectAsync, connectors, error, data } = useConnect();

  // const metamaskConnector = useMemo(() => {
  //   return connectors.find((item) => item.id === 'metaMask');
  // }, [connectors]);

  // const { run: loginByMetaMask, loading: metamaskLoading } = useRequest(
  //   async () => {
  //     if (metamaskConnector) {
  //       try {
  //         const isAccount = await metamaskConnector.isAuthorized();

  //         let account = null;
  //         if (isAccount) {
  //           account = await metamaskConnector.getAccount();
  //         }

  //         if (!account) {
  //           const connectRes = await connectAsync({
  //             connector: metamaskConnector
  //           });
  //           account = connectRes.account;
  //         }
  //         if (account) {
  //           const res = await webApi.userApi.walletVerify(account);
  //           if (res.status === 'UNACTIVATED') {
  //             setAuthType({
  //               type: AuthType.INVITE_CODE,
  //               params: {
  //                 registerType: ThirdPartyAuthType.METAMASK,
  //                 ...res
  //               }
  //             });
  //             // skipInviteCode(res.token);
  //           } else {
  //             BurialPoint.track('signup-Metamask第三方登录code验证成功');
  //             setUserInfo(omit(res, 'token'));
  //             setToken(res.token);
  //             setAuthModalOpen(false);
  //             redirectToUrl('/dashboard');
  //           }
  //         }
  //       } catch (err) {
  //         errorMessage(err);
  //       }
  //     } else {
  //       message.error('No metaMask connector found!');
  //     }
  //   },
  //   { manual: true }
  // );

  // useEffect(() => {
  //   error?.message && message.error(error?.message);
  // }, [error]);

  const [loginPending, setLoginPending] = useState(false);

  const login = (address: string) => {
    webApi.userApi.walletVerify(address).then((res) => {
      if (res.status === 'UNACTIVATED') {
        setAuthType({
          type: AuthType.INVITE_CODE,
          params: {
            registerType: ThirdPartyAuthType.METAMASK,
            ...res
          }
        });
        // skipInviteCode(res.token);
      } else {
        BurialPoint.track('signup-Metamask第三方登录code验证成功');
        setUserInfo(omit(res, 'token'));
        setToken(res.token);
        setAuthModalOpen(false);
        router.refresh();
        redirectToUrl('/dashboard');
      }
    });
  };

  return (
    <>
      {/* <Button
        block
        loading={metamaskLoading}
        disabled={metamaskLoading}
        ghost
        className="px-0 py-[0px] text-neutral-white relative rounded-[10px] w-[48px] h-[48px] border-neutral-medium-gray bg-neutral-black"
        onClick={() => {
          if (!metamaskConnector?.ready) {
            message.error('Please connect to your metamask plugin!');
          } else {
            if (!isPc()) {
              setTipsOpen(true);
            } else {
              loginByMetaMask();
            }
          }
        }}
      >
        <Image src={Metamask} width={24} height={24} alt="MetaMask"></Image>
      </Button> */}
      {/* <Button
        ghost
        loading={metamaskLoading}
        disabled={metamaskLoading}
        onClick={() => {
          if (!metamaskConnector?.ready) {
            message.error('Please connect to your metamask plugin!');
          } else {
            if (!isPc()) {
              setTipsModalOpenState(true);
            } else {
              loginByMetaMask();
            }
          }
        }}
        className="body-m cursor-pointer rounded-[.75rem] border border-neutral-light-gray p-3"
      >
        <Image src={Metamask} width={24} height={24} alt="MetaMask"></Image>
      </Button> */}
      <ConnectButton.Custom>
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
                if (!connected || !userInfo) {
                  if (loginPending && connected) {
                    login(account.address);
                    setLoginPending(false);
                  }
                  return (
                    <Button
                      ghost
                      loading={authenticationStatus === 'loading'}
                      disabled={authenticationStatus === 'loading'}
                      onClick={() => {
                        if (connected) {
                          login(account.address);
                        } else {
                          setLoginPending(true);
                          openConnectModal();
                        }
                      }}
                      className="body-m cursor-pointer rounded-[.75rem] border border-neutral-light-gray p-3"
                    >
                      <Image src={Okx} width={24} height={24} alt="MetaMask"></Image>
                    </Button>
                  );
                }
                // if (chain.unsupported) {
                //   return (
                //     <button onClick={openChainModal} type="button">
                //       Wrong network
                //     </button>
                //   );
                // }

                // return (
                //   <div style={{ display: 'flex', gap: 12 }}>
                //     <button
                //       onClick={openChainModal}
                //       style={{ display: 'flex', alignItems: 'center' }}
                //       type="button"
                //     >
                //       {chain.hasIcon && (
                //         <div
                //           style={{
                //             background: chain.iconBackground,
                //             width: 12,
                //             height: 12,
                //             borderRadius: 999,
                //             overflow: 'hidden',
                //             marginRight: 4
                //           }}
                //         >
                //           {chain.iconUrl && (
                //             <img
                //               alt={chain.name ?? 'Chain icon'}
                //               src={chain.iconUrl}
                //               style={{ width: 12, height: 12 }}
                //             />
                //           )}
                //         </div>
                //       )}
                //       {chain.name}
                //     </button>

                //     <button onClick={openAccountModal} type="button">
                //       {account.displayName}
                //       {account.displayBalance
                //         ? ` (${account.displayBalance})`
                //         : ''}
                //     </button>
                //   </div>
                // );
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>
    </>
  );
};

export default MetamaskLoginButton;
