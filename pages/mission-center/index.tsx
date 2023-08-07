import React from 'react';
import UserInfo from './userInfo';
import Quests from './quests';
import Milestones from './milestones';
import SignUpStreak from './signup-streak';
import BeginnerRewards from './beginner-rewards';
import webApi from '@/service';
import {
  UserLevelType,
  BadgesType,
  MissionDataType
} from '@/service/webApi/missionCenter/type';
import { useRequest } from 'ahooks';
import { AppRootState } from '@/store/redux';
import { shallowEqual, useSelector } from 'react-redux';
import { message } from 'antd';

function MissionCenter() {
  const userInfo = useSelector((state: AppRootState) => {
    return state.user.userInfo;
  }, shallowEqual);
  /** 获取用户等级 */
  const { data: useLevel = {} as UserLevelType } = useRequest(
    async () => {
      let res = await webApi.MissionCenterApi.getUserLevel();
      return res;
    },
    {
      onError(error: any) {
        message.error(`get user level ${error.msg}!`);
      }
    }
  );
  /** 获取用户badge */
  const { data: badges = [] as BadgesType[] } = useRequest(
    async () => {
      let res = await webApi.MissionCenterApi.getAllBadges();
      return res;
    },
    {
      onError(error: any) {
        message.error(`get badges ${error.msg}!`);
      }
    }
  );
  /** 获取mission */
  const { data: missions = [] as MissionDataType[] } = useRequest(
    async () => {
      let res = await webApi.MissionCenterApi.getAllMission();
      return res;
    },
    {
      onError(error: any) {
        message.error(`get mission ${error.msg}!`);
      }
    }
  );
  return (
    <div className="flex justify-between w-full  text-mission-center-basics  text-[14px] font-next-book">
      <UserInfo userInfo={userInfo} useLevel={useLevel} badges={badges} />
      <div className="w-[calc(76%-10px)] [&>div]:mb-3">
        <Quests missions={missions} />
        {/* <Milestones missions={missions} />
        <SignUpStreak missions={missions} />
        <BeginnerRewards missions={missions} /> */}
      </div>
    </div>
  );
}

export default MissionCenter;
