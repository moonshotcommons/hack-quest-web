import React from 'react';
import { IoMdTime } from 'react-icons/io';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';
import { VscError } from 'react-icons/vsc';
import { MdOutlineRefresh } from 'react-icons/md';
import { ApplicationStatus } from '@/service/webApi/resourceStation/type';
import { FiDownload } from 'react-icons/fi';

interface OperationProp {
  checkIds: string[];
  handleStatus: (status: ApplicationStatus) => void;
  handleDown: VoidFunction;
  tabStatus: ApplicationStatus;
  isHandle: boolean;
}

const Operation: React.FC<OperationProp> = ({ checkIds, handleStatus, handleDown, tabStatus, isHandle }) => {
  const onHandleStatus = (status: ApplicationStatus) => {
    if (!checkIds.length) return;
    handleStatus(status);
  };
  const onHandleDwon = () => {
    if (!checkIds.length) return;
    handleDown();
  };
  return (
    <div
      className={`body-m flex h-[44px] items-center justify-between rounded-t-[8px]  px-[20px]  ${checkIds.length ? 'bg-yellow-primary text-neutral-off-black' : 'bg-neutral-light-gray text-neutral-medium-gray'}`}
    >
      <div>{`(${checkIds.length}) Selected`}</div>
      <div
        className={`flex gap-[24px] [&>div]:flex  [&>div]:items-center [&>div]:gap-[6px] ${checkIds.length ? '[&>div]:cursor-pointer ' : '[&>div]:cursor-not-allowed'}`}
      >
        <div onClick={onHandleDwon}>
          <FiDownload />
          Download Application
        </div>
        {isHandle && (
          <>
            {tabStatus === ApplicationStatus.REVIEW && (
              <>
                <div onClick={() => onHandleStatus(ApplicationStatus.APPROVED)}>
                  <IoCheckmarkCircleOutline />
                  Approve
                </div>
                <div onClick={() => onHandleStatus(ApplicationStatus.DECLINE)}>
                  <VscError />
                  Decline
                </div>
                <div onClick={() => onHandleStatus(ApplicationStatus.WAIT)}>
                  <IoMdTime />
                  Waitlist
                </div>
              </>
            )}

            {tabStatus === ApplicationStatus.APPROVED && (
              <>
                <div onClick={() => onHandleStatus(ApplicationStatus.REVIEW)}>
                  <MdOutlineRefresh />
                  Undo Approve
                </div>
              </>
            )}

            {tabStatus === ApplicationStatus.DECLINE && (
              <>
                <div onClick={() => onHandleStatus(ApplicationStatus.REVIEW)}>
                  <MdOutlineRefresh />
                  Undo Deciline
                </div>
              </>
            )}
            {tabStatus === ApplicationStatus.WAIT && (
              <>
                <div onClick={() => onHandleStatus(ApplicationStatus.APPROVED)}>
                  <IoCheckmarkCircleOutline />
                  Approve
                </div>
                <div onClick={() => onHandleStatus(ApplicationStatus.DECLINE)}>
                  <VscError />
                  Decline
                </div>
                <div onClick={() => onHandleStatus(ApplicationStatus.REVIEW)}>
                  <MdOutlineRefresh />
                  Undo Waitlist
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Operation;
