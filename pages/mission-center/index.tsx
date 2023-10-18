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
import { MissionCenterContext } from './type';

function MissionCenter() {
  const userInfo = useSelector((state: AppRootState) => {
    return state.user.userInfo;
  }, shallowEqual);
  const { updateMissionDataAll } = useGetMissionData();
  const [loading, setLoading] = useState(false);
  const [missionIds, setMissionIds] = useState<string[]>([]);

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

  const missionClaim = (missionIds: string[]) => {
    if (loading) return;
    setMissionIds(missionIds);
    BurialPoint.track(`mission-center-claim`);
    setLoading(true);
    webApi.missionCenterApi
      .missionClaim(missionIds)
      .then(() => {
        updateMissionDataAll();
        message.success('success');
      })
      .catch((error) => {
        message.error(`claim ${error.msg}!`);
      })
      .finally(() => {
        setLoading(false);
        setMissionIds([]);
      });
  };
  return (
    <div className="container mx-auto flex justify-between h-[calc(100vh-64px)]  text-[#0b0b0b] tracking-[0.3px] bg-[#f4f4f4]  text-[14px] font-next-book">
      <MissionCenterContext.Provider
        value={{
          loading,
          missionIds,
          changeMissionIds: (ids: string[]) => {
            setMissionIds(ids);
          },
          updateMissionDataAll
        }}
      >
        <UserInfo userInfo={userInfo} userTreasure={userTreasure} />
        <ClaimContent missionClaim={missionClaim} />
      </MissionCenterContext.Provider>
    </div>
  );
}

export default MissionCenter;
