import React from 'react';
import Button from '@/components/Common/Button';
import Google from '@/public/images/login/google.svg';
import Github from '@/public/images/login/github.svg';
import Image from 'next/image';
import webApi from '@/service';
import { AuthType } from '@/service/webApi/user/type';
import { useConnect } from 'wagmi';

function ThreePartyLogin() {
  const { connect, connectors, error, isLoading, pendingConnector, data } =
    useConnect();

  console.log(connectors);
  const loginThreeParty = async (type: AuthType) => {
    if (type === AuthType.METAMASK) {
      const connector = connectors.find((item) => item.id === 'metaMask');
      if (connector) {
        connect({ connector });
        const account = await connector.getAccount();
        console.log(account, '----------------');
      }
      connector;
      return;
    }
    const res = (await webApi.userApi.getAuthUrl(type)) as any;
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
        <Button
          block
          className="border mt-[25px] border-[#f4f4f4] text-[#fff] relative"
          onClick={() => loginThreeParty(AuthType.METAMASK)}
        >
          <Image
            src={Github}
            width={22}
            height={22}
            alt="Github"
            className="absolute left-[25px] top-[16px]"
          ></Image>
          Continue with Metamask
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
