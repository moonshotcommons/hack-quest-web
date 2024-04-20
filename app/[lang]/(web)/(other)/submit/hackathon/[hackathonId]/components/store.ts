import { create } from 'zustand';

interface ContractInfo {
  wechat: string;
  telegram: string;
}

interface SubmissionType {
  groupType: string;
  members: [
    {
      role: string;
      info: {
        name: string;
      };
    }
  ];
}

interface HackathonSubmitStateType {
  name: string;
  contractInfo: ContractInfo;
  bio: string;
  submissionType: SubmissionType;
  setName: (name: string) => void;
  setContractInfo: (contractInfo: ContractInfo) => void;
  setBio: (bio: string) => void;
  setSubmissionType: (submissionType: SubmissionType) => void;
}

export const useHackathonSubmitStore = create<HackathonSubmitStateType>((set) => ({
  name: '',
  contractInfo: {
    wechat: '',
    telegram: ''
  },
  bio: '',
  submissionType: {
    groupType: '',
    members: [
      {
        role: '',
        info: {
          name: ''
        }
      }
    ]
  },
  setName: (name: string) => {
    set({ name });
  },
  setContractInfo: (contractInfo: ContractInfo) => {
    set({ contractInfo });
  },
  setBio: (bio: string) => {
    set({ bio });
  },
  setSubmissionType: (submissionType: SubmissionType) => {
    set({ submissionType });
  }
}));
