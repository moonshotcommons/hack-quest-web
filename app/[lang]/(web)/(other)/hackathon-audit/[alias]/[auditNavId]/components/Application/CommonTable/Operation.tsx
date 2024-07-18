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
  handleStatus: (status: ApplicationStatus) => void;
  handleDown: VoidFunction;
  tabStatus: ApplicationStatus;
}

const Operation: React.FC<OperationProp> = ({ checkIds, handleStatus, handleDown, tabStatus }) => {
  const { hackathon } = useHackathonAuditStore(
    useShallow((state) => ({
      hackathon: state.hackathon
    }))
  );
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
        {hackathon?.info?.mode !== 'ONLINE' && (
          <>
            {tabStatus === ApplicationStatus.REVIEW && (
              <>
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
              </>
            )}

            {tabStatus === ApplicationStatus.APPROVED && (
              <>
                <div onClick={() => handleStatus(ApplicationStatus.REVIEW)}>
                  <MdOutlineRefresh />
                  Undo Approve
                </div>
              </>
            )}

            {tabStatus === ApplicationStatus.REJECTED && (
              <>
                <div onClick={() => handleStatus(ApplicationStatus.REVIEW)}>
                  <MdOutlineRefresh />
                  Undo Deciline
                </div>
              </>
            )}
            {tabStatus === ApplicationStatus.WAIT && (
              <>
                <div onClick={() => handleStatus(ApplicationStatus.APPROVED)}>
                  <IoCheckmarkCircleOutline />
                  Approve
                </div>
                <div onClick={() => handleStatus(ApplicationStatus.REJECTED)}>
                  <VscError />
                  Decline
                </div>
                <div onClick={() => handleStatus(ApplicationStatus.REVIEW)}>
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
