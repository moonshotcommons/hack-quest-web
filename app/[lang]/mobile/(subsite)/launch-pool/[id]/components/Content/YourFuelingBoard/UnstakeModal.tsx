import Button from '@/components/Common/Button';
import Modal from '@/components/Common/Modal';
import React from 'react';
import { FiX } from 'react-icons/fi';

interface UnstakeModalProp {
  open: boolean;
  hanleUnstake: VoidFunction;
  loading: boolean;
  onClose: VoidFunction;
}

const UnstakeModal: React.FC<UnstakeModalProp> = ({ open, hanleUnstake, loading, onClose }) => {
  return (
    <Modal open={open} onClose={onClose} showCloseIcon={true} icon={<FiX size={26} />}>
      <div className=" scroll-wrap-y  w-[808px] rounded-[10px] bg-neutral-white px-[137px]  pb-[40px] pt-[60px]  text-neutral-black">
        <div className="">
          <div className="text-h3 text-center">Unstaking $Manta</div>
          <p className="body-m my-[24px] text-center text-neutral-off-black">
            If you choose to unstake now, your fuel under this stake will be removed. If there is no stake from you in
            this project, your fuel will be zeroed and you will be ineligible to participate in this project IAO
            anymore.
          </p>
          <div className="flex justify-center gap-[16px]">
            <Button
              loading={loading}
              type="primary"
              className="button-text-m  h-[48px]  w-[165px] p-0 uppercase"
              onClick={hanleUnstake}
            >
              unstake now
            </Button>
            <Button
              ghost
              onClick={onClose}
              className="button-text-m  h-[48px]  w-[165px] border-neutral-off-black uppercase text-neutral-off-black"
            >
              cancel
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UnstakeModal;
