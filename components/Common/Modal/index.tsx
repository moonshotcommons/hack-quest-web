'use client';

import { Dialog, Transition } from '@headlessui/react';

import { Fragment } from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  showCloseIcon?: boolean;
}

const Modal: React.FC<ModalProps> = (props) => {
  const { open, onClose, children, showCloseIcon = false } = props;
  return (
    <Transition show={open} appear as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
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
              <Dialog.Panel className="w-full max-w-[74.0625rem] overflow-hidden rounded-[2.5rem] text-left align-middle">
                <div className="relative flex w-full items-center overflow-hidden shadow-2xl">
                  {/* <div className="absolute right-4 top-4"> */}
                  {/* <IconButton onClick={onClose} icon={<X size={15} />} /> */}
                  {/* <div onClick={onClose}>测试关闭</div> */}
                  {/* </div> */}
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
