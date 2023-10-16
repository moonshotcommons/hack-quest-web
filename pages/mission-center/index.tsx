import React, { useEffect, useState } from 'react';
import UserInfo from '@/components/v2/MissionCenter/UserInfo';
import ClaimContent from '@/components/v2/MissionCenter/ClaimContent';
import webApi from '@/service';
import { UserTreasuresType } from '@/service/webApi/missionCenter/type';
import { useRequest } from 'ahooks';
import { AppRootState } from '@/store/redux';
import { shallowEqual, useSelector } from 'react-redux';
import { message } from 'antd';
import { BurialPoint } from '@/helper/burialPoint';
import { useGetMissionData } from '@/hooks/useGetMissionData';

function MissionCenter() {
  const userInfo = useSelector((state: AppRootState) => {
    return state.user.userInfo;
  }, shallowEqual);
  const [claimLoading, setClaimLoading] = useState(false);
  const { updateMissionDataAll } = useGetMissionData();

  /** 获取用户宝箱 */
  const { data: userTreasure = [] as UserTreasuresType[] } = useRequest(
    async () => {
      let res = await webApi.missionCenterApi.getTreasuresCoins();
      return res;
    },
    {
      onError(error: any) {
        // message.error(`get user level ${error.msg}!`);
      }
    }
  );
  const updateUserData = () => {
    updateMissionDataAll();
  };

  const missionClaim = (missionIds: string[]) => {
    if (claimLoading) return;
    BurialPoint.track(`mission-center-claim`);
    setClaimLoading(true);
    webApi.missionCenterApi
      .missionClaim(missionIds)
      .then(() => {
        updateUserData();
        message.success('成功');
      })
      .catch((error) => {
        message.error(`claim ${error.msg}!`);
      })
      .finally(() => {
        setClaimLoading(false);
      });
  };
  return (
    <div className="flex justify-between w-full h-[calc(100vh-64px)]  text-[#0b0b0b] tracking-[0.3px] bg-[#f4f4f4]  text-[14px] font-next-book">
      <UserInfo userInfo={userInfo} userTreasure={userTreasure} />
      <ClaimContent missionClaim={missionClaim} />
    </div>
  );
}

export default MissionCenter;
