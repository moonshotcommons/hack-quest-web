import Modal from '@/components/v2/Common/Modal';
import React, { useState } from 'react';
import { FiX, FiChevronLeft } from 'react-icons/fi';
import List from './List';
import EditAdd from './EditAdd';

interface EditProp {
  open: boolean;
  onClose: VoidFunction;
}

const Edit: React.FC<EditProp> = ({ open, onClose }) => {
  const [status, setStatus] = useState('list');
  const handleEdit = () => {
    setStatus('edit');
  };
  const onRefresh = () => {};
  return (
    <Modal
      open={open}
      onClose={onClose}
      showCloseIcon={true}
      icon={<FiX size={26} />}
    >
      <div className="w-[1000px] bg-[#fff] rounded-[10px] p-[30px]">
        <div className="text-[28px] font-next-book-bold tracking-[1.68px] flex items-center mb-[20px]">
          {status === 'edit' ? (
            <div
              className="flex items-center cursor-pointer "
              onClick={() => setStatus('list')}
            >
              <FiChevronLeft />
              <span>Experience</span>
            </div>
          ) : (
            <span>Experience</span>
          )}
        </div>
        {status === 'list' ? (
          <List onClose={onClose} handleEdit={handleEdit} />
        ) : (
          <EditAdd onCancel={() => setStatus('list')} onRefresh={onRefresh} />
        )}
      </div>
    </Modal>
  );
};

export default Edit;
