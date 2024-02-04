'use client';
import React, { useState } from 'react';
import MessageCard from '../MessageCard';
import { HiArrowLongRight } from 'react-icons/hi2';
import MessageModal from '../MessageModal';

interface MessagesProp {}

const Messages: React.FC<MessagesProp> = () => {
  const list = Array.from({ length: 3 }).map((v, i) => ({ id: i }));
  const [modalOpen, setModalOpen] = useState(false);
  const handleClick = () => {};
  return (
    <div>
      <div className="text-h4 mb-[24px] text-neutral-black">Messages</div>
      <div className="body-s text-[#000]">Unread (2)</div>
      <div className="mb-[24px] mt-[8px] flex flex-col gap-[8px]">
        {list.map((v) => (
          <div key={v.id} className="w-full">
            <MessageCard onClick={() => handleClick()} />
          </div>
        ))}
      </div>
      <div
        className="button-text-s flex cursor-pointer items-center gap-[7px] pl-[16px]  text-neutral-off-black"
        onClick={() => setModalOpen(true)}
      >
        <span className="uppercase">view all</span>
        <HiArrowLongRight size={18}></HiArrowLongRight>
      </div>
      <MessageModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default Messages;
