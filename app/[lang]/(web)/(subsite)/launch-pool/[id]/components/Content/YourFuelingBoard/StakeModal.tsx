import Button from '@/components/Common/Button';
import Modal from '@/components/Common/Modal';
import React from 'react';
import { FiX } from 'react-icons/fi';

interface StakeModalProp {
  open: boolean;
  hanleStake: VoidFunction;
  loading: boolean;
  onClose: VoidFunction;
}

const StakeModal: React.FC<StakeModalProp> = ({
  open,
  hanleStake,
  loading,
  onClose
}) => {
  return (
    <Modal
      open={true}
      onClose={onClose}
      showCloseIcon={true}
      icon={<FiX size={26} />}
    >
      <div className=" w-[808px] rounded-[10px] bg-neutral-white px-[137px]  pb-[40px] pt-[60px]  text-neutral-black">
        <div className="flex flex-col gap-[24px]">
          <div className="text-h3 text-center">Staking $Manta</div>
          <div className="flex justify-center gap-[10px]">
            <Button
              loading={loading}
              type="primary"
              className="button-text-m h-[48px] w-[165px]  uppercase"
              onClick={hanleStake}
            >
              stake now
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default StakeModal;
