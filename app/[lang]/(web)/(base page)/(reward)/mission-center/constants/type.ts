import { MissionDataType } from '@/service/webApi/missionCenter/type';
import { createContext } from 'react';

export interface TabListType {
  label: string;
  count?: number;
}

export interface TabContentType {
  missionData: MissionDataType[];
  unClaimMissionData: MissionDataType[];
  missionClaim: (missionIds: string[], cb?: VoidFunction) => void;
}

export interface MissionCenterContextType {
  missionIds: string[];
  changeMissionIds: (ids: string[]) => void;
  updateMissionDataAll: VoidFunction;
}
export const MissionCenterContext = createContext<MissionCenterContextType>({
  missionIds: [],
  changeMissionIds: () => {},
  updateMissionDataAll: () => {}
});
