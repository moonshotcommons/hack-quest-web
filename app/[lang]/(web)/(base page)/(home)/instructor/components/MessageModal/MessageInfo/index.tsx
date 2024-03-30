'use client';
import React, { useMemo } from 'react';
import { HiArrowLongLeft, HiArrowLongRight } from 'react-icons/hi2';
// import errorIcon from '@/components/Common/Icon/UnRead';
import CompletedIcon from '@/components/Common/Icon/Completed';
import moment from 'moment';

interface MessageInfoProp {
  back: VoidFunction;
}

const MessageInfo: React.FC<MessageInfoProp> = ({ back }) => {
  const arrowDisable = useMemo(() => {
    return {
      left: true,
      right: false
    };
  }, []);
  const handleClick = (arrow: string) => {};
  return (
    <div className="flex flex-col gap-[32px] px-[40px]">
      <p className="body-l flex w-fit cursor-pointer items-center gap-[7px] text-neutral-black" onClick={back}>
        <HiArrowLongLeft size={18}></HiArrowLongLeft>
        <span>Back to All Messages</span>
      </p>
      <div className="scroll-wrap-y flex max-h-[500px] flex-col gap-[8px] rounded-[10px] border border-neutral-light-gray p-[20px]">
        <div className="body-m-bold flex items-center gap-[8px] text-neutral-black">
          <CompletedIcon />
          <span>Course not approved</span>
        </div>
        <div className="body-s text-neutral-off-black">
          Your course ‘Course Name Course Name Course Name Course Name’ has passed the review. Here is the final comment
          from HackQuest team:
        </div>
        <div className="flex gap-[10px] p-[20px] text-neutral-rich-gray">
          <span className=" text-h4">“</span>
          <span className="body-xs">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas accumsan sit amet neque eu dapibus. Mauris
            vitae libero lectus. Vestibulum aliquet sem vel arcu tristique semper. Curabitur dapibus risus id
            sollicitudin viverra. Vivamus in tristique urna. Curabitur dictum fringilla ligula at commodo. Proin
            tincidunt purus at neque gravida, eu finibus magna venenati
          </span>
          <span className="text-h4 flex items-end">”</span>
        </div>
        <div className="body-s text-neutral-rich-gray">
          Now this course is available in the Course Market and has been moved to your ‘Published’, where you can check
          full comments. For assistance, contact us at support@hackquest.io. Thank you again for your support to build a
          better Web3 community!
        </div>
        <div className="body-xs flex items-center gap-[16px] pt-[28px] text-neutral-rich-gray">
          <span> {moment(+new Date()).format('ll')}</span>
          <span>{`From HackQuest Team`}</span>
        </div>
      </div>
      <div className="body-s flex justify-between text-neutral-black">
        <div
          className={`flex  items-center gap-[6px] ${arrowDisable.left ? 'cursor-not-allowed text-neutral-medium-gray' : 'cursor-pointer'}`}
          onClick={() => handleClick('left')}
        >
          <HiArrowLongLeft size={18}></HiArrowLongLeft>
          <span>Previous Message</span>
        </div>
        <div
          className={`flex  items-center gap-[6px] ${arrowDisable.right ? 'cursor-not-allowed text-neutral-medium-gray' : 'cursor-pointer'}`}
          onClick={() => handleClick('right')}
        >
          <span>Next Message</span>
          <HiArrowLongRight size={18}></HiArrowLongRight>
        </div>
      </div>
    </div>
  );
};

export default MessageInfo;
