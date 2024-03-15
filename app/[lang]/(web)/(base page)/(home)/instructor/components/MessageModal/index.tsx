'use client';
import Modal from '@/components/Common/Modal';
import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';
import MessageList from './MessageList';
import MessageInfo from './MessageInfo';

interface MessageModalProp {
  open: boolean;
  onClose: VoidFunction;
}

const MessageModal: React.FC<MessageModalProp> = ({ open, onClose }) => {
  const [messageInfo, setMessageInfo] = useState<any>({});
  return (
    <Modal open={open} onClose={onClose} showCloseIcon icon={<FiX size={30} />}>
      <div className="w-[760px] rounded-[16px] bg-neutral-white py-[40px]">
        {messageInfo.id ? (
          <MessageInfo back={() => setMessageInfo({})} />
        ) : (
          <MessageList handleClick={(message) => setMessageInfo(message)} />
        )}
      </div>
    </Modal>
  );
};

export default MessageModal;
