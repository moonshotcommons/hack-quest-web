'use client';

import { Dialog, Transition } from '@headlessui/react';

import { cn } from '@/helper/utils';
import { FC, Fragment, ReactNode } from 'react';
import { BsXLg } from 'react-icons/bs';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  showCloseIcon?: boolean;
  icon?: ReactNode;
  markBg?: string;
}

const IconClose: FC<{ icon?: ReactNode }> = (props) => {
  const { icon, ...rest } = props;
  return icon ? (
    icon
  ) : (
    <div className="absolute right-[2.25rem] top-[2.5rem] z-[999] cursor-pointer  p-[0.66rem] text-setting-close-icon-color-v2">
      {/* <CloseIcon width={20} height={19} color={'currentColor'} /> */}
      <BsXLg size={22} />
    </div>
  );
};

const Modal: React.FC<ModalProps> = (props) => {
  const {
    open,
    onClose,
    children,
    showCloseIcon = false,
    icon,
    markBg = 'black'
  } = props;
  // const closeIcon =
  return (
    <Transition show={open} appear as={Fragment}>
      <Dialog as="div" className="relative z-[999]" onClose={onClose}>
        <div
          className={cn(
            `fixed inset-0 bg-opacity-50`,
            markBg === 'transparent' ? 'bg-transparent' : 'bg-black'
          )}
        />
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
                <div className="relative flex  items-center overflow-y-scroll no-scrollbar shadow-2xl">
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
