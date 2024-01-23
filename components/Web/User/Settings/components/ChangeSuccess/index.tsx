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
      <div className="w-full flex flex-col text-neutral-black items-center transition-all duration-500 ease-in-out">
        <p className="body-xl-bold  mb-[30px]">Password Changed! 🎉</p>
        <p className="mb-[60px] body-s">
          Your password has been changed successfully.
        </p>
        <Button
          className="w-[240px] mb-[30px] h-[48px] text-neutral-black border border-neutral-black button-text-m"
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
