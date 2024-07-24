import { HackathonManageType, SubmissionStatus } from './type';
import { GrLineChart } from 'react-icons/gr';
import { LiaUserEditSolid } from 'react-icons/lia';
import { ApplicationStatus } from '@/service/webApi/resourceStation/type';
import { MdAppRegistration } from 'react-icons/md';
import { FaBalanceScale } from 'react-icons/fa';
import { IoMdMegaphone } from 'react-icons/io';

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
  }
  // {
  //   id: HackathonManageType.SUBMISSION,
  //   label: 'hackathonManage.submission',
  //   icon: <MdAppRegistration size={20} />
  // },
  // {
  //   id: HackathonManageType.JUDGE,
  //   label: 'hackathonManage.judging',
  //   icon: <FaBalanceScale size={20} />
  // },
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

export const submissionTabData = [
  {
    value: SubmissionStatus.WEB3,
    label: 'AI + Web3 Applications',
    count: 0
  },
  {
    value: SubmissionStatus.HACKQUEST,
    label: 'HackQuest Track',
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
    value: 'ptName',
    label: 'Project Name',
    disable: true
  },
  {
    value: 'name',
    label: 'Applicant Name',
    disable: true
  },
  {
    value: 'sName',
    label: 'Submitter Name',
    disable: true
  },
  {
    value: 'createdAt',
    label: 'Submit Date',
    disable: true
  },
  {
    value: 'sector',
    label: 'Sector'
  },
  {
    value: 'video',
    label: 'Pitch Video'
  },
  {
    value: 'status',
    label: 'Fundraising Status'
  }
];

export const judgingInformationData = [
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
  },
  {
    value: 'score',
    label: 'Final Score',
    disable: true
  }
];
export const applicationAboutBasicKeys = ['resume', 'name', 'gender', 'location', 'university'];
