import React from 'react';
import { FiDownload } from 'react-icons/fi';
import { IoMdTime } from 'react-icons/io';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';
import { VscError } from 'react-icons/vsc';
import { ApplicationStatus } from '../../../../../constants/type';
import { MdOutlineRefresh } from 'react-icons/md';
import { useHackathonAuditStore } from '@/store/zustand/hackathonAuditStore';
import { useShallow } from 'zustand/react/shallow';

interface OperationProp {
  checkIds: string[];
  handleDown: VoidFunction;
}

const Operation: React.FC<OperationProp> = ({ checkIds, handleDown }) => {
  return (
    <div
      className={`body-m flex h-[44px] items-center justify-between rounded-t-[8px]  px-[20px]  ${checkIds.length ? 'bg-yellow-primary text-neutral-off-black' : 'bg-neutral-light-gray text-neutral-medium-gray'}`}
    >
      <div>{`(${checkIds.length}) Selected`}</div>
      <div
        className={`flex gap-[24px] [&>div]:flex  [&>div]:items-center [&>div]:gap-[6px] ${checkIds.length ? '[&>div]:cursor-pointer ' : '[&>div]:cursor-not-allowed'}`}
      >
        <div onClick={handleDown}>
          <FiDownload />
          Download Submission
        </div>
      </div>
    </div>
  );
};

export default Operation;
