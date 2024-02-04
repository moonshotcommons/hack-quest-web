import React from 'react';
// import errorIcon from '@/components/Common/Icon/UnRead';
import CompletedIcon from '@/components/Common/Icon/Completed';
import Image from 'next/image';
import moment from 'moment';

interface MessageCardProp {
  onClick: VoidFunction;
  isModal?: boolean;
}

const MessageCard: React.FC<MessageCardProp> = ({
  onClick,
  isModal = false
}) => {
  return (
    <div
      className="flex cursor-pointer flex-col gap-[8px]  rounded-[10px] border border-neutral-light-gray bg-neutral-white p-[12px]"
      onClick={() => onClick()}
    >
      <div className="body-s flex items-center gap-[8px] text-neutral-black">
        <CompletedIcon />
        <span>Course not approved</span>
      </div>
      <div
        className={`body-xs  text-neutral-medium-gray ${isModal ? 'line-clamp-3' : 'line-clamp-2'}`}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
        accumsan accumsanaccumsanaccumsan
      </div>
      {isModal ? (
        <div className="body-xs flex items-center gap-[16px] text-neutral-rich-gray">
          <span> {moment(+new Date()).format('ll')}</span>
          <span>{`From HackQuest Team`}</span>
        </div>
      ) : null}
    </div>
  );
};

export default MessageCard;
