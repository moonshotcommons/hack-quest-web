'use client';
import HackLogo from '@/public/images/logo/black-icon-text-logo.svg';
import Image from 'next/image';
import React, { FC, useContext } from 'react';
import { IoExitOutline } from 'react-icons/io5';
import { FiSave } from 'react-icons/fi';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import emitter from '@/store/emitter';
import { useRequest } from 'ahooks';
import { errorMessage } from '@/helper/ui';
import { message } from 'antd';

interface SubmitLayoutNavbarProps {}

const SubmitLayoutNavbar: FC<SubmitLayoutNavbarProps> = (props) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.BASIC);
  const { run: onSave, loading } = useRequest(
    () => {
      return new Promise((resolve, reject) => {
        return emitter.emit('submit-form-save', { resolve, reject });
      });
    },
    {
      manual: true,
      onSuccess: (res) => {
        message.success('Save success!');
      },
      onError: (err) => {
        errorMessage(err);
      }
    }
  );

  const onExit = () => {
    emitter.emit('submit-form-exit');
  };

  return (
    <nav className="relative flex h-[64px] w-full items-center justify-end bg-neutral-white px-[40px] text-neutral-white">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Image src={HackLogo} alt="log" width={133} height={16} className="cursor-pointer" onClick={onExit} />
      </div>
      <div className="flex w-[123px] cursor-pointer items-center justify-end gap-[20px] text-neutral-off-black">
        <span className="body-l flex items-center gap-2 capitalize" onClick={onSave}>
          <FiSave size={26} className={`${loading ? 'cursor-not-allowed' : ''}`} />
          <span className="whitespace-nowrap">{t('handleButtonText.save')}</span>
        </span>
        <span className="flex items-center gap-2" onClick={onExit}>
          <IoExitOutline size={29} onClick={() => {}} />
          <span className="whitespace-nowrap">{t('handleButtonText.exit')}</span>
        </span>
      </div>
    </nav>
  );
};

export default SubmitLayoutNavbar;
