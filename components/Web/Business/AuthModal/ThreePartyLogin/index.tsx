import Github from '@/public/images/login/github.svg';
import Google from '@/public/images/login/google.svg';
import webApi from '@/service';
import { ThirdPartyAuthType } from '@/service/webApi/user/type';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import MetamaskLoginButton from './MetamaskLoginButton';
import useIsPc from '@/hooks/utils/useIsPc';
import Button from '@/components/Common/Button';
import { useGlobalStore } from '@/store/zustand/globalStore';
import { useLang } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';

function ThreePartyLogin() {
  const { lang } = useLang();
  const { t } = useTranslation(lang, TransNs.AUTH);
  const [isMounted, setIsMounted] = useState(false);

  const isPc = useIsPc();

  const setTipsModalOpenState = useGlobalStore((state) => state.setTipsModalOpenState);
  const query = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const loginThreeParty = async (type: ThirdPartyAuthType) => {
    const inviteCode = query.get('inviteCode');
    const params = inviteCode
      ? {
          inviteCode
        }
      : {};
    switch (type) {
      // case AuthType.METAMASK:
      //   loginByMetaMask();
      //   return;
      default:
        const res = (await webApi.userApi.getAuthUrl(type, params)) as any;
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
        <div className="body-m flex h-[30px] items-center  text-center text-neutral-medium-gray">
          {t('or_continue_with')}
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
    </div>
  );
}

export default ThreePartyLogin;
