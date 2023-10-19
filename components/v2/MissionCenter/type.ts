import { MissionDataType } from '@/service/webApi/missionCenter/type';
import { createContext } from 'react';

export interface TabListType {
  label: string;
  count?: number;
}

export interface TabContentType {
  missionData: MissionDataType[];
  unClaimMissionData: MissionDataType[];
  missionClaim: (missionIds: string[]) => void;
}

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
