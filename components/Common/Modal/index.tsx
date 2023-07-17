'use client';

import { Dialog, Transition } from '@headlessui/react';

import { FC, Fragment, ReactNode } from 'react';
import CloseIcon from '../Icon/Close';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  showCloseIcon?: boolean;
  icon?: ReactNode;
}

const IconClose: FC<{ icon?: ReactNode }> = (props) => {
  const { icon, ...rest } = props;
  return icon ? (
    icon
  ) : (
    <div className="absolute right-[2.25rem] top-[2.5rem] z-[999] cursor-pointer rounded-full p-[0.66rem] border border-solid border-[#5B5B5B]">
      <CloseIcon width={20} height={19} color={'#F2F2F2'} />
    </div>
  );
};

const Modal: React.FC<ModalProps> = (props) => {
  const { open, onClose, children, showCloseIcon = false, icon } = props;
  // const closeIcon =
  return (
    <Transition show={open} appear as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <div className="fixed inset-0 bg-black bg-opacity-50" />
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-[74.0625rem] overflow-hidden text-left align-middle">
                <div className="relative flex w-full items-center overflow-y-scroll no-scrollbar shadow-2xl">
                  {showCloseIcon ? (
                    <div onClick={onClose}>
                      <IconClose icon={icon}></IconClose>
                    </div>
                  ) : null}
                  {children}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
