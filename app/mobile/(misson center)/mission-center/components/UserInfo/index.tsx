import React from 'react';
import { LoginResponse } from '@/service/webApi/user/type';
import UserData from './UserData';
import Treasures from './Treasures';
import Equity from './Equity';
import { useSelector } from 'react-redux';
import { AppRootState } from '@/store/redux';

export interface UserInfoType {
  userInfo: LoginResponse | null;
}
const UserInfo: React.FC<UserInfoType> = ({ userInfo }) => {
  const { userLevel, userCoin, userTreasure } = useSelector(
    (state: AppRootState) => {
      return {
        userLevel: state.missionCenter?.userLevel,
        userCoin: state.missionCenter?.userCoin,
        userTreasure: state.missionCenter?.userTreasure
      };
    }
  );

  return (
    <div className="flex justify-center flex-shrink-0 w-[360px] py-[40px] h-full">
      <div className="w-full h-full flex-col">
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
