import { HackathonManageType } from './type';
import { GrLineChart } from 'react-icons/gr';
import { LiaUserEditSolid } from 'react-icons/lia';
import { ApplicationStatus } from '@/service/webApi/resourceStation/type';
import { MdAppRegistration } from 'react-icons/md';
import { FaBalanceScale } from 'react-icons/fa';

export const hackathonAuditNavData = [
  {
    id: HackathonManageType.OVERVIEW,
    label: 'hackathonManage.overview',
    icon: <GrLineChart size={20} />
  },
  {
    id: HackathonManageType.APPLICATION,
    label: 'hackathonManage.application',
    icon: <LiaUserEditSolid size={20} />
  },
  {
    id: HackathonManageType.SUBMISSION,
    label: 'hackathonManage.submission',
    icon: <MdAppRegistration size={20} />
  },
  {
    id: HackathonManageType.JUDGE,
    label: 'hackathonManage.judging',
    icon: <FaBalanceScale size={20} />
  }
  // {
  //   id: HackathonManageType.ANNOUNCEMENT,
  //   label: 'hackathonManage.announcement',
  //   icon: <IoMdMegaphone size={20} />
  // }
];

export const applicationTabData = [
  {
    value: ApplicationStatus.REVIEW,
    label: 'Pending Review',
    count: 0
  },
  {
    value: ApplicationStatus.APPROVED,
    label: 'Approved',
    count: 0
  },
  {
    value: ApplicationStatus.DECLINE,
    label: 'Declined',
    count: 0
  },
  {
    value: ApplicationStatus.WAIT,
    label: 'Waitlist',
    count: 0
  }
];

export const hackathonSortData = [
  {
    label: 'Earliest',
    value: 'createdAt'
  },
  {
    label: 'Latest',
    value: '-createdAt'
  },
  {
    label: 'A - Z',
    value: 'name'
  },
  {
    label: 'Z - A',
    value: '-name'
  }
];

export const applicationInformationData = [
  {
    value: 'name',
    label: 'Applicant Name',
    disable: true
  },
  {
    value: 'createdAt',
    label: 'Apply Date',
    disable: true
  },
  {
    value: 'location',
    label: 'Location'
  },
  {
    value: 'university',
    label: 'University'
  },
  {
    value: 'bio',
    label: 'Bio'
  }
];

export const submissionInformationData = [
  {
    value: 'name',
    label: 'Project Name',
    disable: true
  },
  {
    value: 'createdAt',
    label: 'Submit Date',
    disable: true
  },
  {
    value: 'tracks',
    label: 'Sector',
    disable: true
  },
  {
    value: 'location',
    label: 'Location'
  },
  {
    value: 'prizeTrack',
    label: 'PrizeTrack'
  },
  {
    value: 'winner',
    label: 'isWinner'
  }
];

export const applicationAboutBasicKeys = ['resume', 'name', 'gender', 'location', 'university'];

export const judgingBaseInformationData = [
  {
    value: 'rank',
    label: 'rank',
    disable: true
  },
  {
    value: 'name',
    label: 'Project Name',
    disable: true
  },
  {
    value: 'track',
    label: 'Sector',
    disable: true
  }
];

export const judgingAllFixedInformationData = [
  ...judgingBaseInformationData,
  {
    value: 'userVotes',
    label: 'User Votes',
    disable: true
  },
  {
    value: 'judgesVotes',
    label: 'Judge Votes',
    disable: true
  },
  {
    value: 'totalVotes',
    label: 'Total Votes',
    disable: true
  }
];

export const judgingJudgeFixedInformationData = [
  ...judgingBaseInformationData,
  {
    value: 'totalVotes',
    label: 'Total Votes',
    disable: true
  }
];

export const judgingJudgeScoreInformationData = [
  ...judgingBaseInformationData,
  {
    value: 'totalVotes',
    label: 'Final Score',
    disable: true
  }
];
