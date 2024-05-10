import { Transition } from '@headlessui/react';
import React, { Fragment, useContext } from 'react';
import { FiX } from 'react-icons/fi';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { HiArrowLongRight } from 'react-icons/hi2';

interface MessageModalProp {
  open: boolean;
  onClose: VoidFunction;
}

const MessageModal: React.FC<MessageModalProp> = ({ open, onClose }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.BASIC);
  return (
    <Transition show={open} appear as={Fragment}>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div className="relative flex max-h-[calc(100vh-200px)] w-[670px] flex-col rounded-[16px] bg-neutral-white text-neutral-black">
          <div
            className="absolute right-[20px] top-[20px] cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          >
            <FiX size={26} />
          </div>
          <div className="scroll-wrap-y flex-1 px-[40px] pb-[40px] pt-[60px] ">
            <h2 className="text-h3 text-center">New Version Released</h2>
            <div className="mt-[40px] flex flex-col gap-[40px]">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="flex w-full flex-col gap-[12px]">
                  <p className="text-h3">Lorem ipsum</p>
                  <p className="body-l">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tincidunt tortor tellus, id
                    interdum ipsum facilisis non. Aliquam mattis placerat lacus. Nulla porttitor faucibus pellentesque.
                  </p>
                  <div className="body-m relative flex w-fit items-center gap-[7px]">
                    <span>{t('learnMore')}</span>
                    <HiArrowLongRight size={16}></HiArrowLongRight>
                    <div className="absolute bottom-0 left-0 h-[2px] w-full rounded-[2px] bg-yellow-dark"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Transition.Child>
    </Transition>
  );
};

export default MessageModal;
