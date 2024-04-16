import Image from 'next/image';
import { FC } from 'react';

interface ChatHeaderProps {
  close: VoidFunction;
}

const ChatHeader: FC<ChatHeaderProps> = ({ close }) => {
  return (
    <div className="relative flex h-16 w-full justify-between p-4 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:scale-y-50 after:bg-neutral-light-gray">
      <div className="flex h-full items-center gap-3">
        <Image src={'/images/icons/helper_icon.svg'} width={38} height={24} alt="hackquest bot"></Image>
        <h5 className="text-h5">HQ-01</h5>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex gap-1 rounded-full bg-neutral-off-white px-2 py-1">
          <span className="body-s">231</span>
          <Image src={'/images/icons/gold.svg'} alt="hackquest gold" width={24} height={24}></Image>
        </div>
        <div>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M19 12C19 15.864 15.864 19 12 19C8.136 19 5.777 15.108 5.777 15.108M5.777 15.108H8.941M5.777 15.108V18.608M5 12C5 8.136 8.108 5 12 5C16.669 5 19 8.892 19 8.892M19 8.892V5.392M19 8.892H15.892"
              stroke="#0B0B0B"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div onClick={close} className="cursor-pointer">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6 18L18 6M6 6L18 18"
              stroke="#0B0B0B"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
