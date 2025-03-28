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
    continuCount: number;
  } => {
    const len = missions.length;
    if (!len) {
      return {
        missions: [],
        isMissStreak: false,
        continuCount: 0
      };
    }
    let isMissStreak = false;
    //是否有小火花逻辑为连续签到至少7天
    const curDayMission = missions[len - 1];

    const count = curDayMission?.progress?.progress?.[0] || 1;
    const continuCount = curDayMission.status === MissionStatus.CLAIMED ? count : count - 1;
    // 是否需要补签看missions的倒数第二个的claimed是否为false 如果为false则把其状态设置为RESTORE 可以补签的状态
    if (missions.length > 1) {
      isMissStreak = !missions[len - 2]?.progress?.claimed;
      if (isMissStreak) {
        missions[len - 2].status = MissionStatus.RESTORE;
      }
    }
    //除了missions最后一个和倒数第二个 前面的如果状态如果是UNCLAIM 没有签到，将状态都设置为UNCOMPLETED 未完成
    missions.map((v, i) => {
      if (i < len - 2 && v.status === MissionStatus.UNCLAIM) {
        v.status = MissionStatus.UNCOMPLETED;
      }
    });
    let newMissions = missions;
    //补齐剩余的数据  状态默认为UNCOMPLETED
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
      missions: newMissions,
      continuCount
    };
  };

  /**
   * 宝箱不够五个补齐五个 状态设置为UNOBTAIN未获得
   */
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
