'use client';
import Button from '@/components/Common/Button';
import Modal from '@/components/Common/Modal';
import { useRedirect } from '@/hooks/router/useRedirect';
import { useGlobalStore } from '@/store/zustand/globalStore';
import { useUserStore } from '@/store/zustand/userStore';
import React from 'react';
import { FiX } from 'react-icons/fi';
interface TipsModalProp {}

const TipsModal: React.FC<TipsModalProp> = () => {
  const { redirectToUrl } = useRedirect();

  const tipsModalOpenState = useGlobalStore((state) => state.tipsModalOpenState);
  const setTipsModalOpenState = useGlobalStore((state) => state.setTipsModalOpenState);

  const userInfo = useUserStore((state) => state.userInfo);

  return (
    <Modal
      open={tipsModalOpenState.open}
      onClose={() => {
        setTipsModalOpenState({
          open: false,
          isRedirect: false
        });
        if (tipsModalOpenState.isRedirect) {
          userInfo ? redirectToUrl('/dashboard') : redirectToUrl('/');
        }
      }}
      showCloseIcon={true}
      icon={<FiX size={26} color="#fff" />}
    >
      <div className="flex-col-center w-[90vw] rounded-[10px] bg-neutral-rich-gray py-[30px] text-neutral-white shadow-[0px_4px_8px_0_rgba(0,0,0,0.12)]">
        <p className="text-[48px]">😵</p>
        <p className="body-xl-bold mt-[25px]">Laptop is preferred</p>
        <p className="body-s mt-[20px] w-[255px]">
          Currently, this feature is exclusive to the Desktop version. For the complete experience, please access it on
          a Desktop.
        </p>
        <Button
          className="mt-[20px] h-[34px] w-[140px] bg-neutral-white text-neutral-black"
          onClick={() => {
            setTipsModalOpenState({
              open: false,
              isRedirect: false
            });
            if (tipsModalOpenState.isRedirect) {
              userInfo ? redirectToUrl('/dashboard') : redirectToUrl('/');
            }
          }}
        >
          Close
        </Button>
      </div>
    </Modal>
  );
};

export default TipsModal;
