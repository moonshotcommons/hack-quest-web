import React, { useEffect, useLayoutEffect, useState } from 'react';
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

function ThreePartyLogin() {
  const [isMounted, setIsMounted] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const { connectAsync, connectors, error, isLoading, pendingConnector, data } =
    useConnect();

  const { run: loginByMetaMask, loading: metamaskLoading } = useRequest(
    async () => {
      const connector = connectors.find((item) => item.id === 'metaMask');
      if (connector) {
        try {
          const connectRes = await connectAsync({ connector });
          if (connectRes.account) {
            const res = await webApi.userApi.walletVerify(connectRes.account);
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
        } catch (err) {}
      } else {
        message.error('No metaMask connector found!');
      }
    },
    { manual: true }
  );

  const loginThreeParty = async (type: AuthType) => {
    switch (type) {
      case AuthType.METAMASK:
        loginByMetaMask();
        return;
      default:
        const res = (await webApi.userApi.getAuthUrl(type)) as any;
        window.location.href = res?.url;
    }
  };

  useEffect(() => {
    error?.message && message.error(error?.message);
  }, [error]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="">
      <div className="my-[25px]">
        <div className="relative flex py-[9px] justify-center">
          <div className="text-center h-[22px] text-[#fff] text-[18px] tracking-[1.08px]">
            Or
          </div>
          <div className="absolute left-0 top-[21px] w-[calc(50%-50px)] h-[1px] bg-white"></div>
          <div className="absolute right-0 top-[21px] w-[calc(50%-50px)] h-[1px] bg-white"></div>
        </div>
      </div>
      <div>
        <Button
          block
          className="border border-[#f4f4f4] py-[13px] text-[#fff] relative"
          onClick={() => loginThreeParty(AuthType.GOOGLE)}
        >
          <Image
            src={Google}
            width={22}
            height={22}
            alt="Google"
            className="absolute left-[25px] top-[16px]"
          ></Image>
          Continue with Google
        </Button>
        <Button
          block
          className="border mt-[25px] py-[13px] border-[#f4f4f4] text-[#fff] relative"
          onClick={() => loginThreeParty(AuthType.GITHUB)}
        >
          <Image
            src={Github}
            width={22}
            height={22}
            alt="Github"
            className="absolute left-[25px] top-[16px]"
          ></Image>
          Continue with GitHub
        </Button>
        <Button
          block
          loading={metamaskLoading}
          disabled={
            metamaskLoading ||
            !connectors.find((item) => item.id === 'metaMask')?.ready
          }
          className="border mt-[25px] border-[#f4f4f4] py-[13px] text-[#fff] relative"
          onClick={() => loginThreeParty(AuthType.METAMASK)}
        >
          <Image
            src={Metamask}
            width={22}
            height={22}
            alt="Github"
            className="absolute left-[25px] top-[16px]"
          ></Image>
          {!connectors.find((item) => item.id === 'metaMask')?.ready
            ? 'Unsupported'
            : 'Continue with Metamask'}
        </Button>
        {/* <div className="text-red-700 flex gap-1 flex-wrap ">
          {connectors.map((connector) => (
            <button
              disabled={!connector.ready}
              key={connector.id}
              onClick={() => connect({ connector })}
              className="bg-blue-600"
            >
              {connector.name}
              {!connector.ready && ' (unsupported)'}
              {isLoading &&
                connector.id === pendingConnector?.id &&
                ' (connecting)'}
            </button>
          ))}

          {error && <div>{error.message}</div>}
        </div> */}
      </div>
    </div>
  );
}

export default ThreePartyLogin;
