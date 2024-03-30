import React from 'react';
import { titleTxtData } from '../../constants/data';
import moment from 'moment';

interface TimeLineProp {}

const TimeLine: React.FC<TimeLineProp> = () => {
  return (
    <div>
      <p className="text-h3 text-neutral-off-black">{titleTxtData[1]}</p>
      <div className="my-[24px] flex gap-[20px] [&>div]:flex-1">
        <div className="rounded-[16px] border border-neutral-light-gray px-[20px] py-[16px]">
          <div className="flex items-center justify-between">
            <span className="text-h4 text-neutral-off-black">Fueling</span>
            <div className="caption-12pt rounded-[20px] border border-neutral-rich-gray px-[12px] py-[4px] text-neutral-rich-gray">
              ENDED
            </div>
          </div>
          <p className="mt-[8px] text-neutral-rich-gray">{moment(+new Date()).format('ll').split(',').slice(0, 1)}</p>
        </div>

        <div className="rounded-[16px] border border-neutral-light-gray px-[20px] py-[16px]">
          <div className="flex items-center justify-between">
            <span className="text-h4 text-neutral-off-black">Allocation</span>
            <div className="caption-12pt rounded-[20px] border border-neutral-rich-gray px-[12px] py-[4px] text-neutral-rich-gray">
              ENDED
            </div>
          </div>
          <p className="mt-[8px] text-neutral-rich-gray">{moment(+new Date()).format('ll').split(',').slice(0, 1)}</p>
        </div>

        <div className="rounded-[16px] border border-neutral-light-gray px-[20px] py-[16px]">
          <div className="flex items-center justify-between">
            <span className="text-h4 text-neutral-off-black">Airdrop</span>
            <div className="caption-12pt rounded-[20px] border border-status-success-dark px-[12px] py-[4px] text-status-success-dark">
              LIVE
            </div>
          </div>
          <p className="mt-[8px] text-neutral-rich-gray">{moment(+new Date()).format('ll').split(',').slice(0, 1)}</p>
        </div>
      </div>
      <p className="body-s text-neutral-rich-gray">
        {`Finally, after the project's tge(token generation event), you will get
        your token allocation. Usually these tokens will be directly airdroped
        to your wallet address you connected on this platform.`}
      </p>
    </div>
  );
};

export default TimeLine;
