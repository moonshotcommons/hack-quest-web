'use client';
import React, { useEffect, useMemo } from 'react';
import webApi from '@/service';

import message from 'antd/es/message';
import { useGetMissionData } from '@/hooks/mission/useGetMissionData';
import UserInfo from './UserInfo';
import { useMissionCenterStore } from '@/store/zustand/missionCenterStore';
import DailyQuests from './DailyQuests';
import BeginnerRewards from './BeginnerRewards';
import Achievements from './Achievements';
import MissionBg from '@/public/images/mission-center/mission_bg.png';
import DayStreak from './DayStreak';
import Leaderboard from './Leaderboard';
import ReferEarn from './ReferEarn';
import { MissionStatus } from '@/service/webApi/missionCenter/type';
import Loading from '@/components/Common/Loading';
import ContentSkeleton from './ContentSkeleton';

function MissionCenter() {
  const { updateMissionDataAll } = useGetMissionData();
  const missionData = useMissionCenterStore((state) => state.missionData);

  const missionClaim = (missionIds: string[], cb?: VoidFunction) => {
    webApi.missionCenterApi
      .missionClaim(missionIds)
      .then(async () => {
        await updateMissionDataAll();
        cb && cb();
        message.success('success');
      })
      .catch(async (error) => {
        message.error(`claim ${error.msg}!`);
        cb && cb();
      });
  };

  const beginnerRewardsOver = useMemo(() => {
    return missionData.beginnerRewards.every((v) => v.status === MissionStatus.CLAIMED);
  }, [missionData]);

  useEffect(() => {
    updateMissionDataAll();
  }, []);

  return !missionData?.all?.length ? (
    <Loading loading={true}>
      <ContentSkeleton />
    </Loading>
  ) : (
    <div
      className="container mx-auto flex min-h-screen gap-[40px] pb-[100px] pt-[40px]"
      style={{
        backgroundImage: `url(${MissionBg.src})`,
        backgroundPosition: 'right bottom',
        backgroundSize: '80% auto',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="flex flex-1 flex-col gap-[40px]">
        <UserInfo />
        <DailyQuests missionDatas={missionData.dailyQuests} missionClaim={missionClaim} />
        {beginnerRewardsOver ? (
          <>
            <Achievements missionDatas={missionData.milestones} missionClaim={missionClaim} />
            <BeginnerRewards missionDatas={missionData.beginnerRewards} missionClaim={missionClaim} />
          </>
        ) : (
          <>
            <BeginnerRewards missionDatas={missionData.beginnerRewards} missionClaim={missionClaim} />
            <Achievements missionDatas={missionData.milestones} missionClaim={missionClaim} />
          </>
        )}
      </div>
      <div className="relative w-[420px] flex-shrink-0">
        <div className="sticky right-0 top-[40px] flex flex-col gap-[40px]">
          <DayStreak />
          <Leaderboard />
          <ReferEarn />
        </div>
      </div>
    </div>
  );
}

export default MissionCenter;
