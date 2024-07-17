import React from 'react';
import { FiDownload } from 'react-icons/fi';
import { IoMdTime } from 'react-icons/io';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';
import { VscError } from 'react-icons/vsc';
import { ApplicationStatus } from '../../../../constants/type';

interface OperationProp {
  checkIds: string[];
  handleStatus: (status: ApplicationStatus) => void;
  handleDown: VoidFunction;
}

const Operation: React.FC<OperationProp> = ({ checkIds, handleStatus, handleDown }) => {
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
          Download Application
        </div>
        <div onClick={() => handleStatus(ApplicationStatus.APPROVED)}>
          <IoCheckmarkCircleOutline />
          Approve
        </div>
        <div onClick={() => handleStatus(ApplicationStatus.REJECTED)}>
          <VscError />
          Decline
        </div>
        <div onClick={() => handleStatus(ApplicationStatus.WAIT)}>
          <IoMdTime />
          Waitlist
        </div>
      </div>
    </div>
  );
};

export default Operation;
