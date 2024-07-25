import React from 'react';

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
        {/* <div onClick={handleDown}>
          <FiDownload />
          Download Submission
        </div> */}
      </div>
    </div>
  );
};

export default Operation;
