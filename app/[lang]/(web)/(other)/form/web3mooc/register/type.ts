import { NtuRegisterStep } from '@/service/webApi/course/type';
import { HackathonTeam, HackathonTeamDetail } from '@/service/webApi/resourceStation/type';

export interface ContractInfo {
  email?: string;
  weChat?: string;
  telegram?: string;
  twitter?: string;
  discord?: string;
  linkedIn?: string;
  whatsApp?: string;
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
  additionalInfo: {
    selfIntroduction: string;
    isEnrolledSingapore: boolean;
  };
  submissionType: SubmissionType;
  status: NtuRegisterStep;
  isRegister: boolean;
  // setName: (name: string) => void;
  // setContractInfo: (contractInfo: ContractInfo) => void;
  // setBio: (bio: string) => void;
  // setSubmissionType: (submissionType: SubmissionType) => void;
}
