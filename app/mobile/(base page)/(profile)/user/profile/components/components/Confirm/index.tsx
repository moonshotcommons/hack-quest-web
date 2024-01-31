import Modal from '@/components/Common/Modal';
import Button from '@/components/Common/Button';
import { FiX } from 'react-icons/fi';
import { ReactNode } from 'react';

interface ConfirmProp {
  open: boolean;
  onClose: VoidFunction;
  title: string;
  content: ReactNode;
  cancleText?: string;
  confirmText?: string;
  handleConfirm: VoidFunction;
  loading?: boolean;
}

const Confirm: React.FC<ConfirmProp> = ({
  open,
  onClose,
  title,
  content,
  cancleText = 'Cancel',
  confirmText = 'Confirm',
  handleConfirm,
  loading = false
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      showCloseIcon={true}
      icon={<FiX size={26} />}
    >
      <div className="flex h-[400px] w-[800px] flex-col rounded-[10px] bg-[#fff] p-[30px]">
        <div className="font-next-book-bold text-[28px] tracking-[1.68px]">
          {title}
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-[35px]">
          <div className="font-next-book text-[18px] leading-[160%] tracking-[0.063px] text-neutral-black">
            {content}
          </div>
          <div className="flex justify-center gap-[15px]">
            <Button
              onClick={onClose}
              className="h-[44px] w-[265px] border border-neutral-black  font-next-book text-[16px] text-neutral-black"
            >
              {cancleText}
            </Button>
            <Button
              loading={loading}
              onClick={handleConfirm}
              className="h-[44px] w-[265px] bg-yellow-primary font-next-book text-[16px]"
            >
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Confirm;
