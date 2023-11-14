import React, { useEffect, useState } from 'react';
import UserInfo from '@/components/v2/MissionCenter/UserInfo';
import ClaimContent from '@/components/v2/MissionCenter/ClaimContent';
import webApi from '@/service';
import { AppRootState } from '@/store/redux';
import { shallowEqual, useSelector } from 'react-redux';
import { message } from 'antd';
import { BurialPoint } from '@/helper/burialPoint';
import { useGetMissionData } from '@/hooks/useGetMissionData';
import { MissionCenterContext } from '@/components/v2/MissionCenter/type';
import Title from '@/components/Head/Title';

function MissionCenter() {
  const userInfo = useSelector((state: AppRootState) => {
    return state.user.userInfo;
  }, shallowEqual);
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
        cb && cb();
        setLoading(false);
        setMissionIds([]);
        message.success('success');
      })
      .catch(async (error) => {
        cb && cb();
        setLoading(false);
        setMissionIds([]);
        message.error(`claim ${error.msg}!`);
      });
  };
  return (
    <div className="container mx-auto flex justify-between h-[calc(100vh-64px)]  text-[#0b0b0b] tracking-[0.3px] bg-[#f4f4f4]  text-[14px] font-next-book">
      <Title title="Mission Center" />
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
        <UserInfo userInfo={userInfo} />
        <ClaimContent missionClaim={missionClaim} />
      </MissionCenterContext.Provider>
    </div>
  );
}

export default MissionCenter;
