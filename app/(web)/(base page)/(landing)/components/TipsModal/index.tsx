import Button from '@/components/Common/Button';
import Modal from '@/components/Common/Modal';
import React from 'react';
import { FiX } from 'react-icons/fi';
interface TipsModalProp {
  open: boolean;
  onClose: VoidFunction;
}

const TipsModal: React.FC<TipsModalProp> = ({ open, onClose }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      showCloseIcon={true}
      icon={<FiX size={26} color="#fff" />}
    >
      <div className="flex-col-center font-next-book text-[#fff] py-[30px] bg-[#3E3E3E] shadow-[0px_4px_8px_0_rgba(0,0,0,0.12)] rounded-[10px] w-[90vw]">
        <p className="text-[48px]">😵</p>
        <p className="text-[20px] font-next-book-bold mt-[25px]">
          Laptop is preferred
        </p>
        <p className="text-[14px] mt-[20px] w-[255px]">
          Please learn courses with a laptop or desktop computer for a complete
          and feature-rich experience.
        </p>
        <Button
          className="w-[140px] h-[34px] bg-[#fff] text-[#000] mt-[20px]"
          onClick={onClose}
        >
          Close
        </Button>
      </div>
    </Modal>
  );
};

export default TipsModal;
