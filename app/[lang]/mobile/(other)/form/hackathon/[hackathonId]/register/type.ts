import { ApplicationSectionType } from '@/components/HackathonCreation/type';
import { HackathonTeam, HackathonTeamDetail } from '@/service/webApi/resourceStation/type';

export interface ContractInfo {
  email?: string;
  weChat?: string;
  telegram?: string;
  discord?: string;
  collegeName?: string;
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
  status: ApplicationSectionType | 'Review';
  info: {
    [ApplicationSectionType.About]: Record<string, any>;
    [ApplicationSectionType.OnlineProfiles]: Record<string, any>;
    [ApplicationSectionType.Contact]: Record<string, any>;
    [ApplicationSectionType.ApplicationType]: SubmissionType;
  };
  isRegister: boolean;
  // setName: (name: string) => void;
  // setContractInfo: (contractInfo: ContractInfo) => void;
  // setBio: (bio: string) => void;
  // setSubmissionType: (submissionType: SubmissionType) => void;
}
