import React from 'react';
import { UserInfoType } from '..';
import Image from 'next/image';
import IconCoin from '@/public/images/mission-center/icon_coin.png';
import IconXp from '@/public/images/mission-center/icon_xp.png';
import BrokenLine from '@/public/images/mission-center/broken_line.png';
import Ring from './Ring';
import { LoginResponse } from '@/service/webApi/user/type';
import {
  UserCoinType,
  UserLevelType
} from '@/service/webApi/missionCenter/type';

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
      <div className="relative  mx-[auto] flex-center w-[150px] h-[150px] ">
        <div className="absolute w-[70px] right-[-73px] top-[12px] text-center">
          <span className="text-[#000]">{`${userLevel.exp}`}</span>
          <span className="text-[#8C8C8C]">{`/${userLevel.expNextLevel}`}</span>
        </div>
        <Image
          src={BrokenLine}
          width={90}
          alt="vrokenLine"
          className="absolute right-[-72px] top-[30px] z-10"
        ></Image>
        <div className="absolute w-full flex-center h-full left-0 top-0 pointer-events-none">
          <Ring radius={75} percent={userLevel.exp / userLevel.expNextLevel} />
        </div>
        <div className="relative  rounded-[50%] w-[102px] h-[102px] overflow-hidden">
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

      <div className="flex-col-center mt-[20px] mb-[40px]">
        <p className="leading-[22.5px]">
          <span className="text-[18px] ">{userInfo?.name}</span>
          <span className="ml-[15px] font-[250] font-next-book-Thin">
            Lv. {userLevel?.level ?? 0}
          </span>
        </p>
      </div>

      <div className="text-[#000] flex w-full justify-between mb-5 h-[114px]">
        <div className=" pt-[20px] pb-[16px] h-full w-[155px] flex-col-center justify-between rounded-[10px] border border-[#8C8C8C] bg-[#fff]">
          <p>Total XP</p>
          <div className="text-[28px] pt-1  flex-row-center">
            <Image
              src={IconXp}
              width={30}
              alt="iconCoin"
              className="object-cover"
            ></Image>
            <span className=" leading-[45px] ml-[10px]">
              {userLevel?.exp ?? 0}
            </span>
          </div>
        </div>

        <div className=" pt-[20px] pb-[16px] h-full  w-[155px] flex-col-center justify-between rounded-[10px] border border-[#8C8C8C] bg-[#fff]">
          <p>Total Hack Coins</p>
          <div className="text-[28px] pt-1  flex-row-center">
            <Image
              src={IconCoin}
              width={30}
              alt="iconXp"
              className="object-cover"
            ></Image>
            <span className=" leading-[45px] ml-[10px]">
              {userCoin?.coin ?? 0}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserData;
