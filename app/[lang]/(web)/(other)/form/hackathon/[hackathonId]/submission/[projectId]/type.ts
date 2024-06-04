import { ProjectSubmitStepType } from '@/service/webApi/resourceStation/type';

export interface ContractInfo {
  wechat: string;
  telegram: string;
}

export interface SubmissionType {
  type: 'Solo Project' | 'Group Project' | null;
  groupType: string;
  members: {
    role: string;
    info: {
      name: string;
    };
  }[];
}

export interface HackathonSubmitStateType {
  projectId: string;
  isSubmit: boolean;
  info: {
    projectLogo: string;
    projectName: string;
    track: string;
    intro: string;
    prizeTrack: string;
    location: string;
    detailedIntro: string;
  };
  project: {
    efrog?: boolean;
    croak?: boolean;
    submitType?: string;
  };
  links: {
    contractLink: string;
    projectLink: string;
    socialLink: string;
    partnerTooling: string;
  };
  status: ProjectSubmitStepType;
  pitchVideo: string;
  projectDemo: string;
  others: {
    githubLink: string;
    isPublic?: boolean;
  };
  wallet: string;
}
