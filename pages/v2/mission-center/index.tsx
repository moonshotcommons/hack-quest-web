import React, { useState } from 'react';
import UserInfo from '@/components/MissionCenter/UserInfo';
import Quests from '@/components/MissionCenter/Quests';
import Milestones from '@/components/MissionCenter/Milestones';
import SignUpStreak from '@/components/MissionCenter/SignupStreak';
import BeginnerRewards from '@/components/MissionCenter/BeginnerRewards';
import webApi from '@/service';
import {
  UserLevelType,
  BadgesType,
  MissionDataType,
  BeginnerRewardsType,
  MissionType
} from '@/service/webApi/missionCenter/type';
import { useRequest } from 'ahooks';
import { AppRootState } from '@/store/redux';
import { shallowEqual, useSelector } from 'react-redux';
import { message } from 'antd';

function MissionCenter() {
  const userInfo = useSelector((state: AppRootState) => {
    return state.user.userInfo;
  }, shallowEqual);
  const [claimLoading, setClaimLoading] = useState(false);

  /** 获取用户等级 */
  const { data: useLevel = {} as UserLevelType, run: updateUserLevel } =
    useRequest(
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
  const { data: badges = [] as BadgesType[], run: updateBadges } = useRequest(
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
  const { data: missions = [] as MissionDataType[], run: updateMission } =
    useRequest(
      async () => {
        let res = await webApi.MissionCenterApi.getAllMission();
        res?.map((v: MissionDataType) => {
          v.progress.progress[0] = v.progress.progress[0] || 0;
          v.progress.progress[1] = v.progress.progress[1] || 0;
        });
        return res;
      },
      {
        onError(error: any) {
          message.error(`get mission ${error.msg}!`);
        }
      }
    );
  const updateUserData = () => {
    updateUserLevel();
    updateBadges();
    updateMission();
  };

  const missionClaim = (missionIds: string[]) => {
    if (claimLoading) return;
    setClaimLoading(true);
    if (missionIds.length > 1) {
      Promise.all(missionIds.map((v: string) => handleClaim(v)))
        .then(() => {
          updateUserData();
          message.success('成功');
        })
        .finally(() => {
          setClaimLoading(false);
        });
    } else {
      handleClaim(missionIds[0])
        .then(() => {
          updateUserData();
          message.success('成功');
        })
        .finally(() => {
          setClaimLoading(false);
        });
    }
  };
  const handleClaim = (missionId: string) => {
    return new Promise((resolve) => {
      webApi.MissionCenterApi.missionClaim(missionId)
        .then(() => {
          resolve('success');
        })
        .catch((error) => {
          message.error(`mission claim ${error.msg}!`);
        });
    });
  };

  return (
    <div className="flex justify-between w-full  text-mission-center-basics  text-[14px] font-next-book">
      <UserInfo userInfo={userInfo} useLevel={useLevel} badges={badges} />
      <div className="w-[calc(76%-10px)] [&>div]:mb-3">
        <Quests
          questsData={missions.filter(
            (v: MissionDataType) => v.type === MissionType.DAILY_QUESTS
          )}
          missionClaim={missionClaim}
        />
        <Milestones
          milestonesData={missions.filter(
            (v: MissionDataType) => v.type === MissionType.MILESTONES
          )}
          missionClaim={missionClaim}
        />
        <SignUpStreak
          daysData={missions.filter(
            (v: MissionDataType) => v.type === MissionType.SEVEN_DAYS_SIGNUP
          )}
          missionClaim={missionClaim}
        />
        <BeginnerRewards
          rewardData={missions.filter(
            (v: MissionDataType) =>
              BeginnerRewardsType[v.type as BeginnerRewardsType]
          )}
        />
      </div>
    </div>
  );
}

export default MissionCenter;
