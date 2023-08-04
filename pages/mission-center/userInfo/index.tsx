import React, { useState } from 'react';
import Badges from './badges';

function UserInfo() {
  const [showBadges, setShowBadges] = useState(false);
  const data = [1, 2, 3];
  return (
    <div className="flex-center bg-mission-center-box w-[24%] rounded-[20px] h-[561px]">
      <div className="flex-col-center">
        <div className="w-[107px] h-[107px] rounded-[50%] bg-mission-center-rounded"></div>
        <div className="flex-col-center pt-5">
          <p className="text-[20px] font-next-book-bold leading-5">
            Carina Geng
          </p>
          <div className="flex items-center pt-[12px]">
            <div className="w-5 h-5 bg-mission-center-rounded rounded-[50%]"></div>
            <span className="pl-[10px] pr-5 text-[13px]">Level 3</span>
            <div className="w-5 h-5 rounded-[50%] flex-center text-[12px] text-mission-center-undertone border border-mission-center-undertone">
              ?
            </div>
          </div>
        </div>
        <div className="text-mission-center-undertone-d h-[42px] flex text-[12px] leading-3 my-14">
          <div className="h-full flex-col-center justify-between">
            <p>Today’s XP</p>
            <p className="text-[16px] font-next-book-bold text-mission-center-basics">
              50
            </p>
          </div>

          <div className="text-mission-center-undertone-d px-[32px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="42"
              viewBox="0 0 12 42"
            >
              <path d="M12 1L1 42" fill="currentColor" stroke="currentColor" />
            </svg>
          </div>

          <div className="h-full flex-col-center justify-between">
            <p>Total XP</p>
            <p className="text-[16px] font-next-book-bold text-mission-center-basics">
              750/800
            </p>
          </div>
        </div>
        <div
          className={`flex items-center mb-6 relative w-[184px] h-[92px] ${
            data.length > 2 ? 'justify-between' : ''
          }`}
        >
          {data.map((v: any, i: number) => (
            <div
              className={`${
                !i
                  ? 'w-[92px] h-[92px] rounded-[50%] bg-mission-center-rounded  absolute z-1 top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4'
                  : 'w-[69px] h-[69px] rounded-[50%] bg-mission-center-rounded1'
              }`}
              key={v}
            ></div>
          ))}
        </div>
        <button className="base-btn-bg" onClick={() => setShowBadges(true)}>
          View all badges
        </button>
      </div>

      <Badges open={showBadges} onClose={() => setShowBadges(false)} />
    </div>
  );
}

export default UserInfo;
