import React, { useState } from 'react';
import Badges from './badges';
import { UserLevelType, BadgesType } from '@/service/webApi/missionCenter/type';
import Image from 'next/image';
import { LoginResponse } from '@/service/webApi/user/type';

type UserInfoType = {
  userInfo: LoginResponse | null;
  useLevel: UserLevelType;
  badges: BadgesType[];
};
const UserInfo: React.FC<UserInfoType> = ({ userInfo, useLevel, badges }) => {
  const [showBadges, setShowBadges] = useState(false);
  const useLevelBadges =
    useLevel?.badges?.length > 3
      ? useLevel?.badges?.slice(0, 3)
      : useLevel?.badges;

  return (
    <div className="flex-center bg-mission-center-box w-[24%] rounded-[20px] h-[561px]">
      <div className="flex-col-center">
        <div className="relative rounded-[50%] w-[102px] h-[102px] overflow-hidden">
          {userInfo?.avatar && (
            <Image
              src={userInfo?.avatar as string}
              alt="avatar"
              fill
              className="object-cover"
            ></Image>
          )}
        </div>
        <div className="flex-col-center pt-5">
          <p className="text-[20px] font-next-book-bold leading-5">
            {/* {userInfo?.name} */}
          </p>
          <div className="flex items-center pt-[12px]">
            <div className="w-5 h-5 bg-mission-center-rounded rounded-[50%]"></div>
            <span className="pl-[10px] pr-5 text-[13px]">
              Level {useLevel?.level ?? 0}
            </span>
            <div className="w-5 h-5 rounded-[50%] flex-center text-[12px] text-mission-center-undertone border border-mission-center-undertone">
              ?
            </div>
          </div>
        </div>
        <div className="text-mission-center-undertone-d h-[42px] flex text-[12px] leading-3 my-14">
          <div className="h-full flex-col-center justify-between">
            <p>Today’s XP</p>
            <p className="text-[16px] font-next-book-bold text-mission-center-basics">
              {useLevel?.expToday ?? 0}
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
              {`${useLevel?.expCurrent ?? 0}/${useLevel?.expNextLevel ?? 0}`}
            </p>
          </div>
        </div>
        <div
          className={`flex items-center mb-6 relative w-[184px] h-[92px] ${
            useLevelBadges?.length > 2 ? 'justify-between' : ''
          }`}
        >
          {useLevelBadges?.map((badge: BadgesType, i: number) => (
            <div
              className={`overflow-hidden ${
                !i
                  ? 'w-[92px] h-[92px] rounded-[50%] absolute z-[2] top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4'
                  : 'w-[69px] h-[69px] rounded-[50%] relative z-[1]'
              }`}
              key={badge.id}
            >
              {/* <Image
                src={badge?.icon}
                alt="badgeIcon"
                fill
                className="object-cover"
              ></Image> */}
            </div>
          ))}
        </div>
        <button className="base-btn-bg" onClick={() => setShowBadges(true)}>
          View all badges
        </button>
      </div>

      <Badges
        open={showBadges}
        badges={badges}
        onClose={() => setShowBadges(false)}
      />
    </div>
  );
};

export default UserInfo;
