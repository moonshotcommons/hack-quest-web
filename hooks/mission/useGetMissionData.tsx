import webApi from '@/service';
import {
  InviteTreasureType,
  MissionDataType,
  MissionStatus,
  TreasureStatus
} from '@/service/webApi/missionCenter/type';
import { useMissionCenterStore } from '@/store/zustand/missionCenterStore';
import { useShallow } from 'zustand/react/shallow';
export const useGetMissionData = () => {
  const { setUserLevel, setUserCoin, setMissionData, setRankInfo } = useMissionCenterStore(
    useShallow((state) => ({
      setUserLevel: state.setUserLevel,
      setUserCoin: state.setUserCoin,
      setMissionData: state.setMissionData,
      setRankInfo: state.setRankInfo
    }))
  );

  const updateUserLevel = async () => {
    let res = await webApi.missionCenterApi.getUserLevel();
    setUserLevel(res || {});
  };
  const updateUserCoin = async () => {
    let res = await webApi.missionCenterApi.getUserCoins();
    setUserCoin(res || {});
  };
  const updateMissionData = async () => {
    let res = await webApi.missionCenterApi.getAllMission();
    setMissionData(res || []);
  };

  const updateRanks = async () => {
    let res = await webApi.missionCenterApi.getRank();
    setRankInfo(res);
  };

  const updateAll = async () => {
    await updateMissionData();
    updateUserLevel();
    updateUserCoin();
    updateRanks();
  };

  const dealDayStreak = (
    missions: MissionDataType[]
  ): {
    missions: MissionDataType[];
    isMissStreak: boolean;
    isContinu: boolean;
    continuCount: number;
  } => {
    const len = missions.length;
    let isMissStreak = false;
    const isContinu = missions[len - 1].progress.progress[0] === len;
    const continuCount = missions[len - 1].progress.progress[0];
    if (missions.length > 1) {
      isMissStreak = !missions[len - 2].progress.claimed;
      if (isMissStreak) {
        missions[len - 2].status = MissionStatus.RESTORE;
      }
    }
    let newMissions = missions;
    if (missions.length < 7) {
      const mockMissions = Array.from({
        length: 7 - len
      }).map((_, i) => ({
        id: `${+new Date()}${i}`,
        status: MissionStatus.UNCOMPLETED
      }));
      newMissions = [...missions, ...mockMissions] as MissionDataType[];
    }
    return {
      isMissStreak,
      isContinu,
      missions: newMissions,
      continuCount
    };
  };

  const dealTreasures = (treasures: InviteTreasureType[]): InviteTreasureType[] => {
    const len = treasures?.length || 0;
    if (len < 5) {
      const mockTreasures = Array.from({
        length: 5 - len
      }).map((_, i) => ({
        id: `${+new Date()}${i}`,
        status: TreasureStatus.UNOBTAIN
      }));
      return [...treasures, ...mockTreasures] as InviteTreasureType[];
    }
    return treasures;
  };

  return {
    updateMissionDataAll: updateAll,
    updateMissionData,
    updateUserCoin,
    updateRanks,
    dealTreasures,
    dealDayStreak
  };
};
