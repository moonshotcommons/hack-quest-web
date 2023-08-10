import React, { useEffect } from 'react';
import Image from 'next/image';
import Sphere1 from '@/public/images/mission-center/sphere1.png';
import { MissionDataType } from '@/service/webApi/missionCenter/type';

type SignUpStreakType = {
  daysData: MissionDataType[];
  missionClaim: (missionIds: string[]) => void;
};
const SignUpStreak: React.FC<SignUpStreakType> = ({
  daysData,
  missionClaim
}) => {
  const sortDaysData = daysData.sort(
    (a: MissionDataType, b: MissionDataType) =>
      a?.progress.progress[0] - b?.progress.progress[0]
  );
  return (
    <div className="bg-mission-center-box h-[220px] rounded-[20px] flex relative overflow-hidden">
      <div className="relative h-full w-[189px] z-[2]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="189"
          height="220"
          viewBox="0 0 189 220"
          className="text-mission-center-quests absolute left-0 top-0"
          fill="currentColor"
        >
          <path d="M0 20C0 8.9543 8.9543 0 20 0H188.426L128.78 220H20C8.9543 220 0 211.046 0 200V20Z" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="138"
          height="113"
          viewBox="0 0 138 113"
          className="text-mission-center-quests-d absolute left-0 bottom-0"
          fill="currentColor"
        >
          <path
            d="M137.213 80.0671L128.489 112.319H20C8.9543 112.319 0 103.365 0 92.3191V7.24159L56.3756 0.095385C60.2191 -0.391825 64.0614 1.00661 66.6927 3.85035L137.213 80.0671Z"
            fill="currentColor"
          />
        </svg>
        <p className="absolute left-7 top-10 text-[16px] leading-[18px] font-bold">
          7 Days <br /> Signup <br /> Streak
        </p>
      </div>
      <div className="absolute h-[240px] w-[10px] -top-[10px]  left-[158px] bg-mission-center-box z-[3] rotate-[15deg]"></div>
      <div className="absolute left-[135px] pl-[40px] flex flex-1 flex-row-center  w-[calc(100%-185px)]  z-[1]  h-full overflow-auto no-scrollbar">
        {sortDaysData.map((item: MissionDataType, i: number) => {
          return item.progress?.completed ? (
            <div
              key={`${item.id}${i}`}
              className={`flex-shrink-0 w-[119px] h-[142px] ml-3 flex-col-center py-4 justify-between rounded-[20px] bg-mission-center-tab-data text-mission-center-track-color`}
            >
              <p className="text-[11px] leading-3">
                Day {item?.progress?.progress[0]}
              </p>
              <div className="flex-row-center  my-5 h-5">
                <Image
                  src={Sphere1}
                  alt="sphere"
                  width={20}
                  height={20}
                  unoptimized
                />
                <span className="font-next-book-bold text-[14px] leading-[14px] ml-[4px]">
                  {item.exp}
                </span>
              </div>
              {item.progress.claimed ? (
                <button className="flex-center w-[79px] h-[40px] text-mission-center-track border border-mission-center-track rounded-[12px] cursor-not-allowed">
                  Claimed
                </button>
              ) : (
                <button
                  onClick={() => missionClaim([item.id])}
                  className="flex-center w-[79px] h-[40px] bg-mission-center-tab-btn-claimed-bg text-mission-center-tab-btn-claimed-color rounded-[12px]"
                >
                  Claim
                </button>
              )}
            </div>
          ) : (
            <div
              key={`${item.id}${i}`}
              className={`group flex-shrink-0 ml-3 flex-col-center py-4 justify-between rounded-[20px] w-[117px] h-[140px] border border-dashed border-mission-center-track-border text-mission-center-track-color hover:text-mission-center-track-color-r hover:bg-mission-center-track-bg-r hover:border-none`}
            >
              <p className="text-[11px] leading-3">Day {i + 1}</p>
              <div className="flex-row-center  my-5 h-5">
                <Image
                  src={Sphere1}
                  alt="sphere"
                  width={20}
                  height={20}
                  unoptimized
                />
                <span className="font-next-book-bold text-[14px] leading-[14px] ml-[4px]">
                  {item.exp}
                </span>
              </div>
              <button
                className={`flex-center w-[79px] h-[40px]  text-mission-center-lock  rounded-[12px] cursor-not-allowed bg-mission-center-lock-bg group-hover:bg-mission-center-lock-bg-r`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="18"
                  viewBox="0 0 17 18"
                  fill="none"
                >
                  <path
                    d="M4.2487 16.4424C3.85912 16.4424 3.52549 16.3035 3.24782 16.0259C2.97016 15.7482 2.83156 15.4148 2.83203 15.0257V7.94238C2.83203 7.5528 2.97087 7.21917 3.24853 6.94151C3.5262 6.66384 3.85959 6.52524 4.2487 6.52572H4.95703V5.10905C4.95703 4.12919 5.30246 3.29383 5.99332 2.60297C6.68419 1.91211 7.51931 1.56691 8.4987 1.56738C9.47856 1.56738 10.3139 1.91281 11.0048 2.60368C11.6956 3.29454 12.0408 4.12966 12.0404 5.10905V6.52572H12.7487C13.1383 6.52572 13.4719 6.66455 13.7496 6.94222C14.0272 7.21988 14.1658 7.55327 14.1654 7.94238V15.0257C14.1654 15.4153 14.0265 15.7489 13.7489 16.0266C13.4712 16.3043 13.1378 16.4429 12.7487 16.4424H4.2487ZM8.4987 12.9007C8.88828 12.9007 9.22191 12.7619 9.49957 12.4842C9.77724 12.2066 9.91584 11.8732 9.91537 11.484C9.91537 11.0945 9.77653 10.7608 9.49887 10.4832C9.2212 10.2055 8.88781 10.0669 8.4987 10.0674C8.10912 10.0674 7.77549 10.2062 7.49782 10.4839C7.22016 10.7615 7.08156 11.0949 7.08203 11.484C7.08203 11.8736 7.22087 12.2073 7.49853 12.4849C7.7762 12.7626 8.10959 12.9012 8.4987 12.9007ZM6.3737 6.52572H10.6237V5.10905C10.6237 4.51877 10.4171 4.01704 10.0039 3.60384C9.59071 3.19065 9.08898 2.98405 8.4987 2.98405C7.90842 2.98405 7.40669 3.19065 6.99349 3.60384C6.5803 4.01704 6.3737 4.51877 6.3737 5.10905V6.52572Z"
                    fill="#666666"
                  />
                </svg>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SignUpStreak;
