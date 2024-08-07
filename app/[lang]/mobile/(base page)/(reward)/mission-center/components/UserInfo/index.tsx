import React from 'react';
import { LoginResponse } from '@/service/webApi/user/type';

export interface UserInfoType {
  userInfo: LoginResponse | null;
}
const UserInfo: React.FC<UserInfoType> = ({ userInfo }) => {
  // const { userLevel, userCoin, userTreasure } = useMissionCenterStore(
  //   useShallow((state) => {
  //     return {
  //       userLevel: state?.userLevel,
  //       userCoin: state?.userCoin,
  //       userTreasure: state?.userTreasure
  //     };
  //   })
  // );

  return (
    <div className="flex h-full w-[360px] flex-shrink-0 justify-center py-[40px]">
      <div className="h-full w-full flex-col">
        <div className="w-[320px] pb-[30px]">
          {/* <UserData userInfo={userInfo} userLevel={userLevel} userCoin={userCoin} />
          <Treasures userTreasure={userTreasure} />
          <Equity level={userLevel.level} /> */}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
