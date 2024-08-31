import { ecosystemStatsType } from '@/service/webApi/ecosystem/type';
import React from 'react';

interface UserDataProp {
  ecosystemData: ecosystemStatsType;
}

const UserData: React.FC<UserDataProp> = ({ ecosystemData }) => {
  return (
    <div className="flex justify-between gap-[40px] rounded-[8px] border border-neutral-light-gray bg-neutral-white px-[30px] py-[20px] ">
      <div className="body-l items-centertext-neutral-off-black flex">
        <span>Page View：</span>
        <span className="body-l-bold">{ecosystemData?.pageView || 0}</span>
      </div>
      <div className="body-l flex items-center  text-neutral-off-black">
        <span>User Started：</span>
        <span className="body-l-bold">{ecosystemData?.started || 0}</span>
      </div>
    </div>
  );
};

export default UserData;
