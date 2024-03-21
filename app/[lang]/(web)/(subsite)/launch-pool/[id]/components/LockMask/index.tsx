import React from 'react';
import { FaLock } from 'react-icons/fa6';

interface LockMaskProp {
  text?: string;
}

const LockMask: React.FC<LockMaskProp> = ({ text }) => {
  return (
    <div className="flex-center absolute left-0 top-0 z-[10] h-full w-full rounded-[16px] backdrop-blur-sm">
      <div className="flex flex-col items-center gap-[4px] text-neutral-medium-gray">
        <FaLock size={20} />
        <p className="body-l text-neutral-black">{text}</p>
      </div>
    </div>
  );
};

export default LockMask;
