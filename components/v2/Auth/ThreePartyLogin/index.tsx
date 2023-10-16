import React from 'react';
import Button from '@/components/Common/Button';
import Google from '@/public/images/login/google.svg';
import Github from '@/public/images/login/github.svg';
import Image from 'next/image';
import webApi from '@/service';
import { AuthType } from '@/service/webApi/user/type';

function ThreePartyLogin() {
  const loginThreeParty = async (type: AuthType) => {
    const res = (await webApi.userApi.getAuthUrl(type)) as any;
    debugger;
    window.location.href = res?.url;
  };
  return (
    <div className="">
      <div className="relative flex my-[40px] justify-center">
        <div className="text-center h-[22px] text-[#fff] text-[18px] tracking-[1.08px]">
          Or
        </div>
        <div className="absolute left-0 top-[12px] w-[calc(50%-50px)] h-[1px] bg-white"></div>
        <div className="absolute right-0 top-[12px] w-[calc(50%-50px)] h-[1px] bg-white"></div>
      </div>
      <div>
        <Button
          block
          className="border border-[#f4f4f4] text-[#fff] relative"
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
          className="border mt-[25px] border-[#f4f4f4] text-[#fff] relative"
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
      </div>
    </div>
  );
}

export default ThreePartyLogin;
