import Github from '@/public/images/login/github.svg';
import Google from '@/public/images/login/google.svg';
import webApi from '@/service';
import { AuthType } from '@/service/webApi/user/type';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import MetamaskLoginButton from './MetamaskLoginButton';
import useIsPc from '@/hooks/useIsPc';
import TipsModal from '../../Landing/components/TipsModal';

function ThreePartyLogin() {
  const [isMounted, setIsMounted] = useState(false);
  const dispatch = useDispatch();
  const isPc = useIsPc();
  const [tipsOpen, setTipsOpen] = useState(false);

  const loginThreeParty = async (type: AuthType) => {
    switch (type) {
      // case AuthType.METAMASK:
      //   loginByMetaMask();
      //   return;
      default:
        if (!isPc()) {
          setTipsOpen(true);
          return;
        }
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
      <div className="flex gap-[15px] justify-center mt-4">
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
      <TipsModal open={tipsOpen} onClose={() => setTipsOpen(false)} />
    </div>
  );
}

export default ThreePartyLogin;
