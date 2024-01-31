'use client';

import { Dialog, Transition } from '@headlessui/react';

import { FC, Fragment, ReactNode } from 'react';
import CloseIcon from '../Icon/Close';
import { cn } from '@/helper/utils';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  showCloseIcon?: boolean;
  icon?: ReactNode;
  markBg?: string;
  className?: string;
}

const IconClose: FC<{ icon?: ReactNode }> = (props) => {
  const { icon, ...rest } = props;
  return icon ? (
    <div className="absolute right-[2.25rem] top-[2.5rem] z-[999] cursor-pointer">
      {icon}
    </div>
  ) : (
    <div className="absolute right-[2.25rem] top-[2.5rem] z-[999] cursor-pointer rounded-full border border-solid border-neutral-off-white p-[0.66rem]">
      <CloseIcon width={20} height={19} color={'currentColor'} />
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
    markBg = 'black',
    className
  } = props;
  // const closeIcon =
  return (
    <Transition show={open} appear as={Fragment}>
      <Dialog as="div" className="relative z-[999]" onClose={onClose}>
        <div className={cn(`fixed inset-0 bg-black bg-opacity-50`)} />
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
              <Dialog.Panel
                className={cn(
                  'w-fit overflow-hidden text-left align-middle',
                  className
                )}
              >
                <div className="no-scrollbar relative flex  items-center justify-center overflow-y-scroll shadow-2xl">
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
