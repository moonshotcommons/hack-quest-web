import React from 'react';
import { LoginResponse } from '@/service/webApi/user/type';
import UserData from './UserData';
import Treasures from './Treasures';
import Equity from './Equity';
import { useShallow } from 'zustand/react/shallow';
import { useMissionCenterStore } from '@/store/zustand/missionCenterStore';

export interface UserInfoType {
  userInfo: LoginResponse | null;
}
const UserInfo: React.FC<UserInfoType> = ({ userInfo }) => {
  const { userLevel, userCoin, userTreasure } = useMissionCenterStore(
    useShallow((state) => {
      return {
        userLevel: state?.userLevel,
        userCoin: state?.userCoin,
        userTreasure: state?.userTreasure
      };
    })
  );

  return (
    <div className="flex justify-center flex-shrink-0 w-[360px] py-[40px] h-full">
      <div className="w-full h-full flex flex-col">
        <div className="w-[320px] pb-[30px]">
          <UserData
            userInfo={userInfo}
            userLevel={userLevel}
            userCoin={userCoin}
          />
          <Treasures userTreasure={userTreasure} />
          <Equity level={userLevel.level} />
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
