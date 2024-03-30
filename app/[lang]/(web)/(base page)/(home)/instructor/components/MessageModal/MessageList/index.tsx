'use client';
import React, { useState } from 'react';
import MesTab from '../MesTab';
import { MessageTab } from '../../../constants/type';
import MessageCard from '../../MessageCard';
import { messageTab } from '../../../constants/data';

interface MessageListProp {
  handleClick: (message: any) => void;
}

const MessageList: React.FC<MessageListProp> = ({ handleClick }) => {
  const [curTab, setCurTab] = useState<MessageTab>(messageTab[0].value as MessageTab);
  const list = Array.from({ length: 10 }).map((v, i) => ({ id: i }));
  return (
    <>
      <div className=" px-[40px]">
        <p className="text-h3 mb-[32px] text-neutral-black">Messages</p>
        <MesTab curTab={curTab} changeTab={(val) => setCurTab(val)} />
      </div>
      <div className="scroll-wrap-y max-h-[504px] px-[40px]">
        {list.map((v) => (
          <div key={v.id} className="mt-[20px]">
            <MessageCard onClick={() => handleClick(v)} isModal={true} />
          </div>
        ))}
      </div>
    </>
  );
};

export default MessageList;
