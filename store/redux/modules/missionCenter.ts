import { createSlice } from '@reduxjs/toolkit';
import {
  MissionDataType,
  MissionType,
  BeginnerRewardsType
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
  missionData: MissionDataStateType;
}
const filterUnClaim = (
  missions: MissionDataType[],
  type: MissionType | BeginnerRewardsType
) => {
  const data = missions.filter((v) => v.type === type);
  const unClaimData = data.filter(
    (v) => v.progress.completed && !v.progress.claimed
  );
  return { data, unClaimData };
};
const MissionCenterSlice = createSlice({
  name: 'missionCenter',
  initialState: {
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
    }
  } as MissionCenterStateType,
  reducers: {
    setMissionData(state, { type, payload }) {
      payload?.map((v: MissionDataType) => {
        v.progress.progress[0] = v.progress.progress[0] || 0;
        v.progress.progress[1] = v.progress.progress[1] || 0;
      });
      const missionData = {
        all: payload,
        unClaimAll: payload.filter(
          (v: MissionDataType) => v.progress.completed && !v.progress.claimed
        ),
        dailyBonus: filterUnClaim(payload, MissionType.DAILY_BONUS).data,
        unClaimDailyBonus: filterUnClaim(payload, MissionType.DAILY_BONUS)
          .unClaimData,
        beginnerRewards: filterUnClaim(payload, MissionType.BEGINNER_REWARDS)
          .data,
        unClaimBeginnerRewards: filterUnClaim(
          payload,
          MissionType.BEGINNER_REWARDS
        ).unClaimData,
        dailyQuests: filterUnClaim(payload, MissionType.DAILY_QUEST).data,
        unClaimDailyQuests: filterUnClaim(payload, MissionType.DAILY_QUEST)
          .unClaimData,
        milestones: filterUnClaim(payload, MissionType.MILESTONES).data,
        unClaimMilestones: filterUnClaim(payload, MissionType.MILESTONES)
          .unClaimData
      };
      state.missionData = missionData;
    }
  }
});

// 同步的action
export const { setMissionData } = MissionCenterSlice.actions;
export default MissionCenterSlice.reducer;
