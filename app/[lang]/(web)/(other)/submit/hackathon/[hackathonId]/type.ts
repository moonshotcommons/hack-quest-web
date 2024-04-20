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
  name: {
    firstName: string;
    lastName: string;
  };
  contractInfo: ContractInfo;
  bio: string;
  submissionType: SubmissionType;
  // setName: (name: string) => void;
  // setContractInfo: (contractInfo: ContractInfo) => void;
  // setBio: (bio: string) => void;
  // setSubmissionType: (submissionType: SubmissionType) => void;
}
