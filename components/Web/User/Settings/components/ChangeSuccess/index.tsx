import React from 'react';
import { Transition } from '@headlessui/react';
import { BurialPoint } from '@/helper/burialPoint';
import Button from '@/components/Common/Button';
interface ChangeSuccessProp {
  show: boolean;
  onClose: VoidFunction;
}

const ChangeSuccess: React.FC<ChangeSuccessProp> = ({ show, onClose }) => {
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
        <p className="body-xl-bold  mb-[30px]">Password Changed! 🎉</p>
        <p className="body-s mb-[60px]">Your password has been changed successfully.</p>
        <Button
          className="button-text-m mb-[30px] h-[48px] w-[240px] border border-neutral-black text-neutral-black"
          onClick={(e) => {
            BurialPoint.track('settings修改密码成功CLOSE按钮点击');
            onClose();
          }}
        >
          CLOSE
        </Button>
      </div>
    </Transition>
  );
};

export default ChangeSuccess;
