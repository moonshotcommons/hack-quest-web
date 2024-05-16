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

interface RequestProp {
  faucet: FaucetType;
}

const Request: React.FC<RequestProp> = ({ faucet }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.RESOURCE);
  const [inputVal, setInputVal] = useState('');
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState(3);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const handleRequest = () => {
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
    <div className="flex flex-col  gap-[.5rem]">
      <Input
        className="body-m h-[2.875rem] flex-1 rounded-[8px] border-none bg-neutral-white"
        value={inputVal}
        onChange={(e) => {
          let value = e.target.value;
          setInputVal(value);
        }}
      />
      <div className="body-s">
        {isSuccess && (
          <div className="flex items-center gap-[.4375rem] text-neutral-rich-gray">
            <div className="relative h-[.8125rem] w-[.8125rem]">
              <Image src={SuccessIcon} alt={'success-icon'} fill className="object-cover" />
            </div>
            <span>{`${t('faucets.drippedSuccessfully')}(${time}S)`}</span>
          </div>
        )}
        {error && (
          <div className="flex items-center gap-[.4375rem] text-status-error">
            <div className="relative h-[.8125rem] w-[.8125rem]">
              <Image src={WarningIcon} alt={'warning-icon'} fill className="object-cover" />
            </div>
            <span>{error}</span>
          </div>
        )}
      </div>
      <Button
        type="primary"
        disabled={!inputVal}
        className="button-text-s h-[2.125rem] uppercase text-neutral-black"
        onClick={handleRequest}
        loading={loading}
      >
        request {`${faucet.amount} ${faucet.symbol}`}
      </Button>
    </div>
  );
};

export default Request;
