import React from 'react';
import {
  UserCoinType,
  UserLevelType,
  UserTreasuresType
} from '@/service/webApi/missionCenter/type';
import { LoginResponse } from '@/service/webApi/user/type';
import UserData from './UserData';
import Treasures from './Treasures';
import Equity from './Equity';

export interface UserInfoType {
  userInfo: LoginResponse | null;
  userLevel: UserLevelType;
  userCoin: UserCoinType;
  userTreasure: UserTreasuresType[];
}
const UserInfo: React.FC<UserInfoType> = ({
  userInfo,
  userLevel,
  userCoin,
  userTreasure
}) => {
  return (
    <div className="flex justify-center flex-shrink-0 w-[400px] py-[40px] h-full">
      <div className="w-full h-full flex-col-center">
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
