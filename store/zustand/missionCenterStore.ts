import { create } from 'zustand';
import {
  MissionDataType,
  MissionType,
  UserCoinType,
  UserLevelType,
  BeginnerRewardsType,
  UserTreasuresType,
  MissionStatus
} from '@/service/webApi/missionCenter/type';

export interface MissionDataStateType {
  all: MissionDataType[];
  unClaimAll: MissionDataType[];
  dailyBonus: MissionDataType[];
  unClaimDailyBonus: MissionDataType[];
  beginnerRewards: MissionDataType[];
  unClaimBeginnerRewards: MissionDataType[];
  dailyQuests: MissionDataType[];
  unClaimDailyQuests: MissionDataType[];
  milestones: MissionDataType[];
  unClaimMilestones: MissionDataType[];
}

interface MissionCenterStateType {
  userLevel: UserLevelType;
  userCoin: UserCoinType;
  userTreasure: UserTreasuresType[];
  missionData: MissionDataStateType;
  setUserLevel: (payload: UserLevelType) => void;
  setUserCoin: (payload: UserCoinType) => void;
  setUserTreasure: (payload: UserTreasuresType[]) => void;
  setMissionData: (payload: MissionDataType[]) => void;
}

const filterUnClaim = (missions: MissionDataType[], type: MissionType | BeginnerRewardsType) => {
  const data = missions.filter((v) => v.type === type);
  const unClaimData = data.filter((v) => v.progress.completed && !v.progress.claimed);
  return { data, unClaimData };
};

export const useMissionCenterStore = create<MissionCenterStateType>()((set) => ({
  userLevel: {
    exp: 0,
    expNextLevel: 0,
    level: 0,
    expCurrentLevel: 0
  },
  userCoin: {
    coin: 0
  },
  userTreasure: [],
  missionData: {
    all: [],
    unClaimAll: [],
    dailyBonus: [],
    unClaimDailyBonus: [],
    beginnerRewards: [],
    unClaimBeginnerRewards: [],
    dailyQuests: [],
    unClaimDailyQuests: [],
    milestones: [],
    unClaimMilestones: []
  },
  setUserLevel(payload) {
    set((state) => ({ userLevel: payload }));
  },
  setUserCoin(payload) {
    set((store) => ({ userCoin: payload }));
  },
  setUserTreasure(payload) {
    set((store) => ({ userTreasure: payload }));
  },
  setMissionData(payload) {
    payload?.map((v: MissionDataType) => {
      v.progress.progress = v.progress.progress || [];
      v.progress.progress[0] = v.progress.progress[0] || 0;
      v.progress.progress[1] = v.progress.progress[1] || 0;
      let status;
      const { completed, claimed } = v?.progress || {};
      if (!completed) {
        status = MissionStatus.UNCOMPLETED;
      } else if (!claimed) {
        status = MissionStatus.UNCLAIM;
      } else {
        status = MissionStatus.CLAIMED;
      }
      v.status = status;
    });
    const missionData = {
      all: payload,
      unClaimAll: payload.filter((v: MissionDataType) => v.progress.completed && !v.progress.claimed),
      dailyBonus: filterUnClaim(payload, MissionType.DAILY_BONUS).data,
      unClaimDailyBonus: filterUnClaim(payload, MissionType.DAILY_BONUS).unClaimData,
      beginnerRewards: filterUnClaim(payload, MissionType.BEGINNER_REWARDS).data,
      unClaimBeginnerRewards: filterUnClaim(payload, MissionType.BEGINNER_REWARDS).unClaimData,
      dailyQuests: filterUnClaim(payload, MissionType.DAILY_QUEST).data,
      unClaimDailyQuests: filterUnClaim(payload, MissionType.DAILY_QUEST).unClaimData,
      milestones: filterUnClaim(payload, MissionType.MILESTONES).data,
      unClaimMilestones: filterUnClaim(payload, MissionType.MILESTONES).unClaimData
    };
    set((state) => ({ missionData: missionData }));
  }
}));
