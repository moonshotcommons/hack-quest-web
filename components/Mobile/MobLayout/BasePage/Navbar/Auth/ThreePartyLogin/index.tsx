import Github from '@/public/images/login/github.svg';
import Google from '@/public/images/login/google.svg';
import webApi from '@/service';
import { ThirdPartyAuthType } from '@/service/webApi/user/type';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import MetamaskLoginButton from './MetamaskLoginButton';
import Button from '@/components/Common/Button';

function ThreePartyLogin() {
  const [isMounted, setIsMounted] = useState(false);

  const loginThreeParty = async (type: ThirdPartyAuthType) => {
    switch (type) {
      // case AuthType.METAMASK:
      //   loginByMetaMask();
      //   return;
      default:
        // if (!isPc()) {
        //   setTipsOpen(true);
        //   return;
        // }
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
      <div className="relative flex justify-center">
        <div className="body-s flex h-[30px] items-center  text-center text-neutral-medium-gray">
          or continue with
        </div>
        <div className="absolute left-0 top-1/2 h-[1px] w-[calc(50%-80px)] -translate-y-1/2 bg-neutral-medium-gray"></div>
        <div className="absolute right-0 top-1/2 h-[1px] w-[calc(50%-80px)] -translate-y-1/2 bg-neutral-medium-gray"></div>
      </div>
      <div className="mt-4 flex justify-center gap-8">
        <Button
          ghost
          onClick={() => loginThreeParty(ThirdPartyAuthType.GOOGLE)}
          className="body-m cursor-pointer rounded-[.75rem] border border-neutral-light-gray p-3"
        >
          <Image src={Google} width={24} height={24} alt="Google"></Image>
        </Button>
        <Button
          ghost
          onClick={() => loginThreeParty(ThirdPartyAuthType.GITHUB)}
          className="body-m cursor-pointer rounded-[.75rem] border border-neutral-light-gray p-3"
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
      {/* <TipsModal open={tipsOpen} onClose={() => setTipsOpen(false)} /> */}
    </div>
  );
}

export default ThreePartyLogin;
