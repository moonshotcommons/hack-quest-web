import webApi from '@/service';
// import {
//   setUserLevel,
//   setUserCoin,
//   setMissionData,
//   setUserTreasure
// } from '@/store/redux/modules/missionCenter';
import { useMissionCenterStore } from '@/store/zustand/missionCenterStore';
import { useShallow } from 'zustand/react/shallow';
export const useGetMissionData = () => {
  const { setUserLevel, setUserCoin, setMissionData, setUserTreasure } = useMissionCenterStore(
    useShallow((state) => ({
      setUserLevel: state.setUserLevel,
      setUserCoin: state.setUserCoin,
      setMissionData: state.setMissionData,
      setUserTreasure: state.setUserTreasure
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
  const updateTreasures = async () => {
    let res = await webApi.missionCenterApi.getTreasures();
    setUserTreasure(res || []);
  };
  const updateAll = async () => {
    await updateMissionData();
    updateUserLevel();
    updateUserCoin();
    updateTreasures();
  };

  return { updateMissionDataAll: updateAll, updateMissionData };
};
