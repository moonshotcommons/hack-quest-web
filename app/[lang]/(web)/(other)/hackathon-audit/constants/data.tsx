import { FaBalanceScale } from 'react-icons/fa';
import { ApplicationStatus, HackathonAuditType, SubmissionStatus } from './type';
import { GrLineChart } from 'react-icons/gr';
import { LiaUserEditSolid } from 'react-icons/lia';
import { MdAppRegistration, MdOutlineEngineering } from 'react-icons/md';

export const hackathonAuditNavData = [
  {
    id: HackathonAuditType.OVERVIEW,
    label: 'hackathonAudit.overview',
    icon: <GrLineChart size={20} />
  },
  {
    id: HackathonAuditType.APPLICATION,
    label: 'hackathonAudit.application',
    icon: <LiaUserEditSolid size={20} />
  },
  {
    id: HackathonAuditType.SUBMISSION,
    label: 'hackathonAudit.submission',
    icon: <MdAppRegistration size={20} />
  },
  {
    id: HackathonAuditType.JUDGE,
    label: 'hackathonAudit.judging',
    icon: <FaBalanceScale size={20} />
  }
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
    value: ApplicationStatus.REJECTED,
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

export const applicationSortData = [
  {
    label: 'Earliest',
    value: 'time'
  },
  {
    label: 'Latest',
    value: '-time'
  },
  {
    label: 'A - Z',
    value: 'unicode'
  },
  {
    label: 'Earliest',
    value: '-unicode'
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

export const mockData = [
  {
    id: '1',
    name: 'name1',
    createdAt: new Date(),
    location: 'asasas',
    university: 'university111university111university111university111university111university111',
    bio: 'biio111'
  },
  {
    id: '2',
    name: 'name1',
    createdAt: new Date(),
    location: 'asasas',
    university: 'university111',
    bio: 'biio111biio111biio111biio111biio111biio111biio111biio111biio111biio111biio111',
    team: [
      {
        id: '222',
        name: 'nam222222',
        createdAt: new Date(),
        location: 'asasas',
        university: 'university111',
        bio: 'biio111'
      },
      {
        id: '333',
        name: 'nam222222',
        createdAt: new Date(),
        location: 'asasas',
        university: 'university111',
        bio: 'biio111'
      },
      {
        id: '444',
        name: 'nam222222',
        createdAt: new Date(),
        location: 'asasas',
        university: 'university111',
        bio: 'biio111'
      }
    ]
  },
  {
    id: '3',
    name: 'name1name1name1name1name1name1name1name1name1name1',
    createdAt: new Date(),
    location: 'asasas',
    university: 'university111',
    bio: 'biio111'
  },
  {
    id: '4',
    name: 'name1',
    createdAt: new Date(),
    location: 'asasas',
    university: 'university111',
    bio: 'biio111'
  },
  {
    id: '5',
    name: 'name1',
    createdAt: new Date(),
    location: 'asasas',
    university: 'university111',
    bio: 'biio111'
  },
  {
    id: '6',
    name: 'name1',
    createdAt: new Date(),
    location: 'asasas',
    university: 'university111',
    bio: 'biio111',
    team: [
      {
        id: '222',
        name: 'nam222222',
        createdAt: new Date(),
        location: 'asasas',
        university: 'university111',
        bio: 'biio111'
      },
      {
        id: '333',
        name: 'nam222222',
        createdAt: new Date(),
        location: 'asasas',
        university: 'university111',
        bio: 'biio111'
      },
      {
        id: '444',
        name: 'nam222222',
        createdAt: new Date(),
        location: 'asasas',
        university: 'university111',
        bio: 'biio111'
      }
    ]
  },
  {
    id: '11',
    name: 'name1',
    createdAt: new Date(),
    location: 'asasas',
    university: 'university111',
    bio: 'biio111'
  },
  {
    id: '12',
    name: 'name1',
    createdAt: new Date(),
    location: 'asasas',
    university: 'university111',
    bio: 'biio111'
  },
  {
    id: '13',
    name: 'name1',
    createdAt: new Date(),
    location: 'asasas',
    university: 'university111',
    bio: 'biio111'
  },
  {
    id: '14',
    name: 'name1',
    createdAt: new Date(),
    location: 'asasas',
    university: 'university111',
    bio: 'biio111'
  },
  {
    id: '16',
    name: 'name1',
    createdAt: new Date(),
    location: 'asasas',
    university: 'university111',
    bio: 'biio111'
  },
  {
    id: '517',
    name: 'name1',
    createdAt: new Date(),
    location: 'asasas',
    university: 'university111',
    bio: 'biio111'
  },
  {
    id: '18',
    name: 'name1',
    createdAt: new Date(),
    location: 'asasas',
    university: 'university111',
    bio: 'biio111'
  }
];

export const mockData1 = [
  {
    id: '1',
    ptName: 'ptName1',
    sName: 'sName1',
    name: 'name1',
    createdAt: new Date(),
    location: 'asasas',
    university: 'university111university111university111university111university111university111',
    bio: 'biio111'
  },
  {
    id: '2',
    ptName: 'ptName1',
    sName: 'sName1',
    name: 'name1',
    createdAt: new Date(),
    location: 'asasas',
    university: 'university111',
    bio: 'biio111biio111biio111biio111biio111biio111biio111biio111biio111biio111biio111',
    team: [
      {
        id: '222',
        ptName: 'ptName1',
        sName: 'sName1',
        name: 'nam222222',
        createdAt: new Date(),
        location: 'asasas',
        university: 'university111',
        bio: 'biio111'
      },
      {
        id: '333',
        ptName: 'ptName1',
        sName: 'sName1',
        name: 'nam222222',
        createdAt: new Date(),
        location: 'asasas',
        university: 'university111',
        bio: 'biio111'
      },
      {
        id: '444',
        ptName: 'ptName1',
        sName: 'sName1',
        name: 'nam222222',
        createdAt: new Date(),
        location: 'asasas',
        university: 'university111',
        bio: 'biio111'
      }
    ]
  },
  {
    id: '3',
    ptName: 'ptName1',
    sName: 'sName1',
    name: 'name1name1name1name1name1name1name1name1name1name1',
    createdAt: new Date(),
    location: 'asasas',
    university: 'university111',
    bio: 'biio111'
  },
  {
    id: '4',
    ptName: 'ptName1',
    sName: 'sName1',
    name: 'name1',
    createdAt: new Date(),
    location: 'asasas',
    university: 'university111',
    bio: 'biio111'
  },
  {
    id: '5',
    ptName: 'ptName1',
    sName: 'sName1',
    name: 'name1',
    createdAt: new Date(),
    location: 'asasas',
    university: 'university111',
    bio: 'biio111'
  },
  {
    id: '6',
    ptName: 'ptName1',
    sName: 'sName1',
    name: 'name1',
    createdAt: new Date(),
    location: 'asasas',
    university: 'university111',
    bio: 'biio111',
    team: [
      {
        id: '222',
        ptName: 'ptName1',
        sName: 'sName1',
        name: 'nam222222',
        createdAt: new Date(),
        location: 'asasas',
        university: 'university111',
        bio: 'biio111'
      },
      {
        id: '333',
        ptName: 'ptName1',
        sName: 'sName1',
        name: 'nam222222',
        createdAt: new Date(),
        location: 'asasas',
        university: 'university111',
        bio: 'biio111'
      },
      {
        id: '444',
        ptName: 'ptName1',
        sName: 'sName1',
        name: 'nam222222',
        createdAt: new Date(),
        location: 'asasas',
        university: 'university111',
        bio: 'biio111'
      }
    ]
  },
  {
    id: '11',
    ptName: 'ptName1',
    sName: 'sName1',
    name: 'name1',
    createdAt: new Date(),
    location: 'asasas',
    university: 'university111',
    bio: 'biio111'
  },
  {
    id: '12',
    ptName: 'ptName1',
    sName: 'sName1',
    name: 'name1',
    createdAt: new Date(),
    location: 'asasas',
    university: 'university111',
    bio: 'biio111'
  },
  {
    id: '13',
    ptName: 'ptName1',
    sName: 'sName1',
    name: 'name1',
    createdAt: new Date(),
    location: 'asasas',
    university: 'university111',
    bio: 'biio111'
  },
  {
    id: '14',
    name: 'name1',
    createdAt: new Date(),
    location: 'asasas',
    university: 'university111',
    bio: 'biio111'
  },
  {
    id: '16',
    ptName: 'ptName1',
    sName: 'sName1',
    name: 'name1',
    createdAt: new Date(),
    location: 'asasas',
    university: 'university111',
    bio: 'biio111'
  },
  {
    id: '517',
    ptName: 'ptName1',
    sName: 'sName1',
    name: 'name1',
    createdAt: new Date(),
    location: 'asasas',
    university: 'university111',
    bio: 'biio111'
  },
  {
    id: '18',
    ptName: 'ptName1',
    sName: 'sName1',
    name: 'name1',
    createdAt: new Date(),
    location: 'asasas',
    university: 'university111',
    bio: 'biio111'
  }
];
