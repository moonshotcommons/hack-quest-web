import Button from '@/components/Common/Button';
import { Input } from '@/components/ui/input';
import { FaucetType } from '@/service/webApi/resourceStation/type';
import Image from 'next/image';
import React, { useContext, useState } from 'react';
import WarningIcon from '@/public/images/resource/warning_icon.svg';
import SuccessIcon from '@/public/images/resource/success_icon.svg';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';

interface RequestProp {
  faucet?: FaucetType;
}

const Request: React.FC<RequestProp> = ({ faucet }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.RESOURCE);
  const [inputVal, setInputVal] = useState('');
  return (
    <div className="w-full">
      <div className="flex h-[40px] items-center gap-[16px]">
        <Input
          className="h-full flex-1 rounded-[8px] border-none bg-neutral-white"
          value={inputVal}
          onChange={(e) => {
            setInputVal(e.target.value);
          }}
        />
        <Button type="primary" disabled={!inputVal} className="button-text-m h-full uppercase text-neutral-black">
          request 0.01 arbeth
        </Button>
      </div>
      <div className="body-l mt-[12px]">
        <div className="flex items-center gap-[7px] text-neutral-rich-gray">
          <div className="relative h-[20px] w-[20px]">
            <Image src={SuccessIcon} alt={'success-icon'} fill className="object-cover" />
          </div>
          <span>{`${t('faucets.drippedSuccessfully')}(${3}S)`}</span>
        </div>
        <div className="flex items-center gap-[7px] text-status-error">
          <div className="relative h-[20px] w-[20px]">
            <Image src={WarningIcon} alt={'warning-icon'} fill className="object-cover" />
          </div>
          <span>{t('faucets.waithours')}</span>
        </div>
      </div>
    </div>
  );
};

export default Request;
