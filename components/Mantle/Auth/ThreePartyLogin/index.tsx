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
import MetamaskLoginButton from './MetamaskLoginButton';

function ThreePartyLogin() {
  const [isMounted, setIsMounted] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const loginThreeParty = async (type: AuthType) => {
    switch (type) {
      case AuthType.METAMASK:
        return;
      default:
        const res = (await webApi.userApi.getAuthUrl(type)) as any;
        window.location.href = res?.url;
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="">
      <div className="my-[25px]">
        <div className="relative flex py-[9px] justify-center">
          <div className="text-center h-[22px] text-[#fff] text-[18px] tracking-[1.08px]">
            or continue with
          </div>
          <div className="absolute left-0 top-[21px] w-[calc(50%-100px)] h-[1px] bg-white"></div>
          <div className="absolute right-0 top-[21px] w-[calc(50%-100px)] h-[1px] bg-white"></div>
        </div>
      </div>
      <div className="flex gap-[30px] justify-center">
        <div
          onClick={() => loginThreeParty(AuthType.GOOGLE)}
          className="cursor-pointer w-[48px] h-[48px] border flex items-center justify-center rounded-[10px] border-[#8C8C8C] bg-[#0B0B0B]"
        >
          <Image src={Google} width={24} height={24} alt="Google"></Image>
        </div>
        <div
          onClick={() => loginThreeParty(AuthType.GITHUB)}
          className="cursor-pointer w-[48px] h-[48px] border flex items-center justify-center rounded-[10px] border-[#8C8C8C] bg-[#0B0B0B]"
        >
          <Image src={Github} width={24} height={24} alt="Github"></Image>
        </div>
        <MetamaskLoginButton></MetamaskLoginButton>
      </div>
    </div>
  );
}

export default ThreePartyLogin;
