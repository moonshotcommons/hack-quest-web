import { MissionDataType } from '@/service/webApi/missionCenter/type';

export interface TabListType {
  label: string;
  count?: number;
}

export interface TabContentType {
  missionData: MissionDataType[];
  unClaimMissionData: MissionDataType[];
  missionClaim: (missionIds: string[]) => void;
}
