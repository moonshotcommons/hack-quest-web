import BrokenLine from '@/public/images/mission-center/broken_line.png';
import IconCoin from '@/public/images/mission-center/icon_coin.png';
import IconXp from '@/public/images/mission-center/icon_xp.png';
import {
  UserCoinType,
  UserLevelType
} from '@/service/webApi/missionCenter/type';
import { LoginResponse } from '@/service/webApi/user/type';
import Image from 'next/image';
import React from 'react';
import Ring from './Ring';

export interface UserDataType {
  userInfo: LoginResponse | null;
  userLevel: UserLevelType;
  userCoin: UserCoinType;
}
const UserData: React.FC<UserDataType> = ({
  userInfo,
  userLevel,
  userCoin
}) => {
  return (
    <>
      <div className="flex-center  relative mx-[auto] h-[150px] w-[150px] ">
        <div className="absolute right-[-73px] top-[12px] w-[70px] text-center">
          <span className="text-neutral-black">{`${userLevel.expCurrentLevel}`}</span>
          <span className="text-neutral-medium-gray">{`/${userLevel.expNextLevel}`}</span>
        </div>
        <Image
          src={BrokenLine}
          width={90}
          alt="vrokenLine"
          className="absolute right-[-72px] top-[30px] z-10"
        ></Image>
        <div className="flex-center pointer-events-none absolute left-0 top-0 h-full w-full">
          <Ring
            radius={75}
            percent={userLevel.expCurrentLevel / userLevel.expNextLevel}
          />
        </div>
        <div className="relative  h-[102px] w-[102px] overflow-hidden rounded-[50%]">
          {userInfo?.avatar && (
            <Image
              src={userInfo?.avatar as string}
              alt="avatar"
              fill
              className="object-cover"
            ></Image>
          )}
        </div>
      </div>

      <div className="flex-col-center mb-[40px] mt-[20px]">
        <p className="leading-[22.5px]">
          <span className="body-l ">{userInfo?.nickname}</span>
          <span className="body-m ml-[15px] font-next-book-Thin font-[250]">
            Lv. {userLevel?.level ?? 0}
          </span>
        </p>
      </div>

      <div className="mb-5 flex h-[114px] w-full justify-between text-neutral-black">
        <div className=" flex-col-center h-full w-[155px] justify-between rounded-[10px] border border-neutral-medium-gray bg-neutral-white pb-[16px] pt-[20px]">
          <p>Total XP</p>
          <div className="flex-row-center pt-1  text-[28px]">
            <Image
              src={IconXp}
              width={30}
              alt="iconCredits"
              className="object-cover"
            ></Image>
            <span className=" ml-[10px] leading-[45px]">
              {userLevel?.exp ?? 0}
            </span>
          </div>
        </div>

        <div className=" flex-col-center h-full w-[155px]  justify-between rounded-[10px] border border-neutral-medium-gray bg-neutral-white pb-[16px] pt-[20px]">
          <p>Total Hack Credits</p>
          <div className="flex-row-center pt-1  text-[28px]">
            <Image
              src={IconCoin}
              width={30}
              alt="iconXp"
              className="object-cover"
            ></Image>
            <span className=" ml-[10px] leading-[45px]">
              {userCoin?.coin ?? 0}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserData;
