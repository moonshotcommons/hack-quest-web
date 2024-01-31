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
      <div className="w-[800px] h-[400px] bg-[#fff] rounded-[10px] p-[30px] flex flex-col">
        <div className="text-h3">{title}</div>
        <div className="flex-1 flex flex-col items-center justify-center gap-[35px]">
          <div className="text-neutral-black body-l">{content}</div>
          <div className="flex justify-center gap-[15px]">
            <Button
              onClick={onClose}
              className="w-[265px] h-[44px] border border-neutral-black  text-neutral-black body-m"
            >
              {cancleText}
            </Button>
            <Button
              loading={loading}
              onClick={handleConfirm}
              className="w-[265px] h-[44px] bg-yellow-primary body-m"
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
