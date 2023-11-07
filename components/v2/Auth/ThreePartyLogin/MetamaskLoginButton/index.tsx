import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import Button from '@/components/v2/Common/Button';
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
interface MetamaskLoginButtonProps {}

const MetamaskLoginButton: React.FC<MetamaskLoginButtonProps> = (props) => {
  const [isMounted, setIsMounted] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

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
              dispatch(setUserInfo(omit(res, 'token')));
              BurialPoint.track('signup-Metamask第三方登录code验证成功');
              setToken(res.token);
              router.push('/home');
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
    <Button
      block
      loading={metamaskLoading}
      disabled={metamaskLoading}
      className="border mt-[25px] border-[#f4f4f4] py-[13px] text-[#fff] relative"
      onClick={() => {
        if (!metamaskConnector?.ready) {
          message.error('Please connect to your metamask plugin!');
        } else {
          loginByMetaMask();
        }
      }}
    >
      <Image
        src={Metamask}
        width={22}
        height={22}
        alt="Github"
        className="absolute left-[25px] top-[16px]"
      ></Image>
      {'Continue with MetaMask'}
    </Button>
  );
};

export default MetamaskLoginButton;
