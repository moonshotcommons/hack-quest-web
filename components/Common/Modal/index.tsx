'use client';

import { Dialog, Transition } from '@headlessui/react';

import { FC, Fragment, ReactNode, useEffect } from 'react';
import CloseIcon from '../Icon/Close';
import { cn } from '@/helper/utils';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  showCloseIcon?: boolean;
  icon?: ReactNode;
  markBg?: string;
  rootClassName?: string;
  className?: string;
  iconClassName?: string;
  block?: boolean;
  zIndex?: number;
}

const IconClose: FC<{ icon?: ReactNode; className?: string }> = (props) => {
  const { icon, className, ...rest } = props;
  return icon ? (
    <div className={cn('absolute right-[1.25rem] top-[1.25rem] z-[999] cursor-pointer', className)}>{icon}</div>
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
    rootClassName,
    className,
    iconClassName,
    block = false,
    zIndex = 999
  } = props;

  // Lock body scroll
  useEffect(() => {
    if (open) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [open]);

  return (
    <Transition show={open} appear as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[999]"
        style={{
          zIndex: zIndex
        }}
        onClose={onClose}
      >
        <div className={cn(`fixed bg-black bg-opacity-50`, block ? 'inset-x-0 bottom-0 top-[64px]' : 'inset-0')} />
        <div className={cn('fixed  overflow-y-auto', block ? 'inset-x-0 bottom-0 top-[64px]' : 'inset-0')}>
          <div
            className={cn('flex min-h-full items-center justify-center text-center', block ? '' : 'p-4', rootClassName)}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className={cn('w-fit overflow-hidden text-left align-middle', className)}>
                <div className="no-scrollbar relative flex  items-center justify-center overflow-y-scroll shadow-2xl">
                  {showCloseIcon ? (
                    <div onClick={onClose}>
                      <IconClose icon={icon} className={iconClassName}></IconClose>
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
