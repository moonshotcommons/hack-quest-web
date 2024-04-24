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
  info: {
    projectLogo: string;
    projectName: string;
    track: string;
    intro: string;
    detailedIntro: string;
  };
  pickVideo: string;
  projectDemo: string;
  others: {
    githubLink: string;
    isPublic: boolean;
  };
  wallet: string;
}
