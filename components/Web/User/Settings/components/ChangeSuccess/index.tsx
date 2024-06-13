import React from 'react';
import { Transition } from '@headlessui/react';
import { BurialPoint } from '@/helper/burialPoint';
import Button from '@/components/Common/Button';
import { useLang } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';

interface ChangeSuccessProp {
  show: boolean;
  onClose: VoidFunction;
}

const ChangeSuccess: React.FC<ChangeSuccessProp> = ({ show, onClose }) => {
  const { lang } = useLang();
  const { t } = useTranslation(lang, TransNs.AUTH);
  return (
    <Transition
      show={show}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="flex w-full flex-col items-center text-neutral-black transition-all duration-500 ease-in-out">
        <p className="body-xl-bold  mb-[30px]">{t('password_changed')} 🎉</p>
        <p className="body-s mb-[60px]">{t('password_changed_success')}</p>
        <Button
          className="button-text-m mb-[30px] h-[48px] w-[240px] border border-neutral-black uppercase text-neutral-black"
          onClick={(e) => {
            BurialPoint.track('settings修改密码成功CLOSE按钮点击');
            onClose();
          }}
        >
          {t('close')}
        </Button>
      </div>
    </Transition>
  );
};

export default ChangeSuccess;
