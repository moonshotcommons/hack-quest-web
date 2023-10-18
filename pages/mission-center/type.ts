import { createContext } from 'react';

export interface MissionCenterContextType {
  loading: boolean;
  missionIds: string[];
  changeMissionIds: (ids: string[]) => void;
  updateMissionDataAll: VoidFunction;
}
export const MissionCenterContext = createContext<MissionCenterContextType>({
  loading: false,
  missionIds: [],
  changeMissionIds: () => {},
  updateMissionDataAll: () => {}
});
