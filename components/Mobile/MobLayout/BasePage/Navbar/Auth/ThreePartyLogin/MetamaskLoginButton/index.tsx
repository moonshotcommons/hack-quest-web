import Button from '@/components/Common/Button';
import TipsModal from '@/app/(web)/(base page)/(landing)/components/TipsModal';
import { BurialPoint } from '@/helper/burialPoint';
import { setToken } from '@/helper/user-token';
import { errorMessage } from '@/helper/ui';
import useIsPc from '@/hooks/useIsPc';
import { useRedirect } from '@/hooks/useRedirect';
import Metamask from '@/public/images/login/metamask.svg';
import webApi from '@/service';
import { ThirdPartyAuthType } from '@/service/webApi/user/type';
import { useRequest } from 'ahooks';
import { message } from 'antd';
import { omit } from 'lodash-es';
import Image from 'next/image';
import React, { useEffect, useMemo, useState } from 'react';
import { useConnect } from 'wagmi';
import { AuthType, useUserStore } from '@/store/zustand/userStore';
import { useShallow } from 'zustand/react/shallow';
interface MetamaskLoginButtonProps {}

const MetamaskLoginButton: React.FC<MetamaskLoginButtonProps> = (props) => {
  const [isMounted, setIsMounted] = useState(false);
  const isPc = useIsPc();
  const [tipsOpen, setTipsOpen] = useState(false);
  const { redirectToUrl } = useRedirect();

  const { setAuthType, setUserInfo, setAuthModalOpen } = useUserStore(
    useShallow((state) => ({
      setAuthType: state.setAuthType,
      setUserInfo: state.setUserInfo,
      setAuthModalOpen: state.setAuthModalOpen
    }))
  );

  const { connectAsync, connectors, error, isLoading, pendingConnector, data } =
    useConnect();

  const metamaskConnector = useMemo(() => {
    return connectors.find((item) => item.id === 'metaMask');
  }, [connectors]);

  const { run: loginByMetaMask, loading: metamaskLoading } = useRequest(
    async () => {
      if (metamaskConnector) {
        try {
          const isAccount = await metamaskConnector.isAuthorized();

          let account = null;
          if (isAccount) {
            account = await metamaskConnector.getAccount();
          }

          if (!account) {
            const connectRes = await connectAsync({
              connector: metamaskConnector
            });
            account = connectRes.account;
          }
          if (account) {
            const res = await webApi.userApi.walletVerify(account);
            if (res.status === 'UNACTIVATED') {
              setAuthType({
                type: AuthType.INVITE_CODE,
                params: {
                  registerType: ThirdPartyAuthType.METAMASK,
                  ...res
                }
              });
            } else {
              BurialPoint.track('signup-Metamask第三方登录code验证成功');
              setUserInfo(omit(res, 'token'));
              setToken(res.token);
              setAuthModalOpen(false);
              redirectToUrl('/dashboard');
            }
          }
        } catch (err) {
          errorMessage(err);
        }
      } else {
        message.error('No metaMask connector found!');
      }
    },
    { manual: true }
  );

  useEffect(() => {
    error?.message && message.error(error?.message);
  }, [error]);

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
      <Button
        ghost
        loading={metamaskLoading}
        disabled={metamaskLoading}
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
        className="body-m cursor-pointer rounded-[.75rem] border border-neutral-light-gray p-3"
      >
        <Image src={Metamask} width={24} height={24} alt="MetaMask"></Image>
      </Button>
      <TipsModal open={tipsOpen} onClose={() => setTipsOpen(false)} />
    </>
  );
};

export default MetamaskLoginButton;
