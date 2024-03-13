import React, { useEffect, useState } from 'react';
import Modal from '@/components/Common/Modal';
import Button from '@/components/Common/Button';
import { FiX } from 'react-icons/fi';

interface DeleteModalProp {
  open: boolean;
  handleDelete: VoidFunction;
  deleteInfo: Record<string, any>;
  loading: boolean;
}

const DeleteModal: React.FC<DeleteModalProp> = ({
  open: isOpen,
  handleDelete,
  deleteInfo,
  loading
}) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      showCloseIcon={true}
      icon={<FiX size={26} />}
    >
      <div className="flex w-[808px] flex-col items-center rounded-[10px] bg-neutral-white p-[60px] text-neutral-black">
        <div className="text-h3">{deleteInfo.title}</div>
        <div className="my-[40px]">{deleteInfo.content}</div>
        <div className="flex justify-center gap-[10px]">
          <Button
            ghost
            className="button-text-m h-[48px] w-[165px] border-neutral-black uppercase"
            onClick={() => setOpen(false)}
          >
            cancel
          </Button>
          <Button
            loading={loading}
            type="primary"
            className="button-text-m h-[48px] w-[165px]  uppercase"
            onClick={handleDelete}
          >
            delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
