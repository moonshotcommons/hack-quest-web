import { HackathonRegisterStep, HackathonTeam, HackathonTeamDetail } from '@/service/webApi/resourceStation/type';

export interface ContractInfo {
  weChat?: string;
  telegram?: string;
}

export interface SubmissionType {
  type: 'Solo Project' | 'Group Project' | null;
  groupType?: 'member' | 'owner';
  team?: HackathonTeam;
  userId?: string;
  teamDetail?: HackathonTeamDetail | {};
  avatar?: string;
}

export interface HackathonRegisterStateType {
  name: {
    firstName: string;
    lastName: string;
  };
  contractInfo: ContractInfo;
  bio: string;
  submissionType: SubmissionType;
  status: HackathonRegisterStep;
  isRegister: boolean;
  // setName: (name: string) => void;
  // setContractInfo: (contractInfo: ContractInfo) => void;
  // setBio: (bio: string) => void;
  // setSubmissionType: (submissionType: SubmissionType) => void;
}
