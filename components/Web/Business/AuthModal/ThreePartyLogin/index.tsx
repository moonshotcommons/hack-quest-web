import Github from '@/public/images/login/github_light.svg';
import Google from '@/public/images/login/google.svg';
import webApi from '@/service';
import { ThirdPartyAuthType } from '@/service/webApi/user/type';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import MetamaskLoginButton from './MetamaskLoginButton';
import useIsPc from '@/hooks/useIsPc';

import Button from '@/components/Common/Button';
import { useGlobalStore } from '@/store/zustand/globalStore';

function ThreePartyLogin() {
  const [isMounted, setIsMounted] = useState(false);

  const isPc = useIsPc();

  const setTipsModalOpenState = useGlobalStore(
    (state) => state.setTipsModalOpenState
  );

  const loginThreeParty = async (type: ThirdPartyAuthType) => {
    switch (type) {
      // case AuthType.METAMASK:
      //   loginByMetaMask();
      //   return;
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
    <div className="w-full">
      <div className="relative flex h-[39px] items-center justify-center">
        <div className="flex items-center text-center font-GT-Walsheim-Trial  text-[18px] text-white">
          or continue with
        </div>
        <div className="absolute left-0 top-1/2 h-[1px] w-[calc(50%-80px)] -translate-y-1/2 bg-white"></div>
        <div className="absolute right-0 top-1/2 h-[1px] w-[calc(50%-80px)] -translate-y-1/2 bg-white"></div>
      </div>
      <div className="mt-4 flex justify-center gap-8">
        <Button
          ghost
          onClick={() => loginThreeParty(ThirdPartyAuthType.GOOGLE)}
          className="cursor-pointer rounded-[.625rem] border border-neutral-medium-gray bg-neutral-black p-3 font-GT-Walsheim-Trial"
        >
          <Image src={Google} width={24} height={24} alt="Google"></Image>
        </Button>
        <Button
          ghost
          onClick={() => loginThreeParty(ThirdPartyAuthType.GITHUB)}
          className="cursor-pointer rounded-[.625rem] border border-neutral-medium-gray bg-neutral-black p-3 font-GT-Walsheim-Trial"
        >
          <Image src={Github} width={24} height={24} alt="Github"></Image>
        </Button>
        {/* <div
          onClick={() => loginThreeParty(ThirdPartyAuthType.GITHUB)}
          className="cursor-pointer w-[48px] h-[48px] border flex items-center justify-center rounded-[10px] border-neutral-medium-gray bg-neutral-black"
        >
          <Image src={Github} width={24} height={24} alt="Github"></Image>
        </div> */}
        <MetamaskLoginButton></MetamaskLoginButton>

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
