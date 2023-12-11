import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import Button from '@/components/Mantle/Common/Button';
import Google from '@/public/images/login/google.svg';
import Github from '@/public/images/login/github.svg';
import Metamask from '@/public/images/login/metamask.svg';
import Image from 'next/image';
import webApi from '@/service';
import { AuthType } from '@/service/webApi/user/type';
import { useConnect } from 'wagmi';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import {
  UnLoginType,
  setUnLoginType,
  setUserInfo
} from '@/store/redux/modules/user';
import { useRequest } from 'ahooks';
import { omit } from 'lodash-es';
import { BurialPoint } from '@/helper/burialPoint';
import { setToken } from '@/helper/user-token';
import { useRouter } from 'next/router';
import { errorMessage } from '@/helper/utils';
import useIsPc from '@/hooks/useIsPc';
import TipsModal from '@/components/Mantle/Landing/components/TipsModal';
interface MetamaskLoginButtonProps {}

const MetamaskLoginButton: React.FC<MetamaskLoginButtonProps> = (props) => {
  const [isMounted, setIsMounted] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const [tipsOpen, setTipsOpen] = useState(false);
  const isPc = useIsPc();
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
              dispatch(
                setUnLoginType({
                  type: UnLoginType.INVITE_CODE,
                  params: {
                    registerType: AuthType.METAMASK,
                    ...res
                  }
                })
              );
            } else {
              BurialPoint.track('signup-Metamask第三方登录code验证成功');
              dispatch(setUserInfo(omit(res, 'token')));
              setToken(res.token);
              router.push(
                `https://www.hackquest.io/learning-track/6d108f0d-dfb2-4dad-8f38-93b45573bc43?learningTrackId=6d108f0d-dfb2-4dad-8f38-93b45573bc43&menu=learningTrack&origin=mantle&token=${res.token}`
              );
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

  return (
    <>
      <Button
        block
        loading={metamaskLoading}
        disabled={metamaskLoading}
        ghost
        className="px-0 py-[0px] text-[#fff] relative rounded-[10px] w-[48px] h-[48px] border-[#8C8C8C] bg-[#0B0B0B]"
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
      </Button>
      <TipsModal open={tipsOpen} onClose={() => setTipsOpen(false)} />
    </>
  );
};

export default MetamaskLoginButton;
