'use client';
import React, { useState } from 'react';
import webApi from '@/service';

import { message } from 'antd';
import { BurialPoint } from '@/helper/burialPoint';
import { useGetMissionData } from '@/hooks/useGetMissionData';
import { MissionCenterContext } from '../constants/type';
import UserInfo from './UserInfo';
import ClaimContent from './ClaimContent';
import { useUserStore } from '@/store/zustand/userStore';
import { LoginResponse } from '@/service/webApi/user/type';

function MissionCenter() {
  const userInfo = useUserStore((state) => state.userInfo);
  const { updateMissionDataAll } = useGetMissionData();
  const [loading, setLoading] = useState(false);
  const [missionIds, setMissionIds] = useState<string[]>([]);

  const missionClaim = (missionIds: string[], cb?: () => {}) => {
    if (loading) return;
    setMissionIds(missionIds);
    BurialPoint.track(`mission-center-claim`);
    setLoading(true);
    webApi.missionCenterApi
      .missionClaim(missionIds)
      .then(async () => {
        await updateMissionDataAll();
        message.success('success');
      })
      .catch(async (error) => {
        message.error(`claim ${error.msg}!`);
      })
      .finally(() => {
        cb && cb();
        setLoading(false);
        setMissionIds([]);
      });
  };

  return (
    <div className="container mx-auto flex justify-between h-full  text-neutral-black tracking-[0.3px] bg-neutral-off-white  text-[14px] font-next-book">
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
        <UserInfo userInfo={userInfo as LoginResponse} />
        <ClaimContent missionClaim={missionClaim} />
      </MissionCenterContext.Provider>
    </div>
  );
}

export default MissionCenter;
