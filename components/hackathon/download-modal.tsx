import React from 'react';
import Modal from '../Common/Modal';
import { FiX } from 'react-icons/fi';

interface DownloadModalProp {
  open: boolean;
  onClose: () => void;
  handleDownload: (type: 'csv' | 'xlsx') => void;
}

const DownloadModal: React.FC<DownloadModalProp> = ({ open, onClose, handleDownload }) => {
  return (
    <Modal open={open} showCloseIcon onClose={onClose} icon={<FiX size={30} />}>
      <div className="flex w-[444px] flex-col items-center gap-[20px] rounded-[16px] bg-neutral-white p-[40px]">
        <p className="body-xl">File type</p>
        <div className="body-m flex gap-[30px] text-neutral-off-black">
          <div
            onClick={() => handleDownload('csv')}
            className="flex h-[34px] w-[120px] cursor-pointer items-center justify-center rounded-[8px] border border-neutral-medium-gray transition-all hover:scale-[1.1]"
          >
            CSV
          </div>
          <div
            onClick={() => handleDownload('xlsx')}
            className="flex h-[34px] w-[120px] cursor-pointer items-center justify-center rounded-[8px] border border-neutral-medium-gray transition-all hover:scale-[1.1]"
          >
            XLSX
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DownloadModal;
