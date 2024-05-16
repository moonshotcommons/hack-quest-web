import Button from '@/components/Common/Button';
import { Input } from '@/components/ui/input';
import { FaucetType } from '@/service/webApi/resourceStation/type';
import Image from 'next/image';
import React, { useContext, useEffect, useRef, useState } from 'react';
import WarningIcon from '@/public/images/resource/warning_icon.svg';
import SuccessIcon from '@/public/images/resource/success_icon.svg';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { errorMessage } from '@/helper/ui';
import webApi from '@/service';
import { AuthType, useUserStore } from '@/store/zustand/userStore';
import { useShallow } from 'zustand/react/shallow';
import { isEthAddress } from '@/helper/utils';

interface RequestProp {
  faucet: FaucetType;
}

const Request: React.FC<RequestProp> = ({ faucet }) => {
  const { userInfo, setAuthModalOpen, setAuthType } = useUserStore(
    useShallow((state) => ({
      userInfo: state.userInfo,
      setAuthModalOpen: state.setAuthModalOpen,
      setAuthType: state.setAuthType
    }))
  );
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.RESOURCE);
  const [inputVal, setInputVal] = useState('');
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState(3);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const handleRequest = () => {
    if (!userInfo) {
      setAuthModalOpen(true);
      setAuthType(AuthType.LOGIN);
      return;
    }
    if (!isEthAddress(inputVal)) {
      errorMessage({ msg: t('faucets.inputAddressError') });
      return;
    }
    setLoading(true);
    webApi.resourceStationApi
      .faucetClaim({
        chainId: faucet.chainId,
        address: inputVal
      })
      .then(() => {
        setIsSuccess(true);
        timer.current = setInterval(() => {
          setTime((pre) => pre - 1);
        }, 1000);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.msg);
        errorMessage(err);
      });
  };

  useEffect(() => {
    if (!time) {
      timer.current && clearInterval(timer.current);
      window.location.reload();
    }
  }, [time]);
  useEffect(() => {
    return () => {
      timer.current && clearInterval(timer.current);
    };
  }, []);
  return (
    <div className="w-full">
      <div className="flex h-[40px] items-center gap-[16px]">
        <Input
          className="h-full flex-1 rounded-[8px] border-none bg-neutral-white"
          value={inputVal}
          onChange={(e) => {
            let value = e.target.value;
            setInputVal(value);
          }}
        />
        <Button
          type="primary"
          disabled={!inputVal}
          className="button-text-m h-full uppercase text-neutral-black"
          onClick={handleRequest}
          loading={loading}
        >
          request {`${faucet.amount} ${faucet.symbol}`}
        </Button>
      </div>
      <div className="body-l mt-[12px]">
        {isSuccess && (
          <div className="flex items-center gap-[7px] text-neutral-rich-gray">
            <div className="relative h-[20px] w-[20px]">
              <Image src={SuccessIcon} alt={'success-icon'} fill className="object-cover" />
            </div>
            <span>{`${t('faucets.drippedSuccessfully')}(${3}S)`}</span>
          </div>
        )}
        {error && (
          <div className="flex items-center gap-[7px] text-status-error">
            <div className="relative h-[20px] w-[20px]">
              <Image src={WarningIcon} alt={'warning-icon'} fill className="object-cover" />
            </div>
            <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Request;
