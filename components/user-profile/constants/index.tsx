import { AwardIcon, LinkIcon, MonitorIcon, TargetIcon, TerminalIcon } from 'lucide-react';

export const INDICATORS = [
  {
    title: 'Technical Ability',
    icon: TerminalIcon,
    content: [
      {
        title: 'Join more hackathons',
        link: '/hackathon/explore'
      },
      {
        title: 'Earn more Certificates',
        link: '/ecosystem-explore'
      },
      {
        title: 'Increase Web3 related commit on Github',
        link: '#'
      }
    ]
  },
  {
    title: 'On-chain Activity',
    icon: LinkIcon,
    content: [
      {
        title: 'More on-chain interactions',
        link: '#'
      },
      {
        title: 'Deploy more smart contract',
        link: '#'
      }
    ]
  },
  {
    title: 'Reputation',
    icon: AwardIcon,
    content: [
      {
        title: 'Get more attestations',
        link: '#'
      },
      {
        title: 'Complete your profile',
        link: '#',
        action: 'onboarding'
      },
      {
        title: 'Add Web3 related working experience',
        link: '#',
        action: 'experience'
      }
    ]
  },
  {
    title: 'Influence',
    icon: TargetIcon,
    content: [
      {
        title: 'Increase Stars for your Web3 Repo',
        link: '#'
      },
      {
        title: 'Connect more socials',
        link: '#',
        action: 'profile'
      },
      {
        title: 'Increase attestations from verified individuals',
        link: '#'
      }
    ]
  },
  {
    title: 'Contribution',
    icon: MonitorIcon,
    content: [
      {
        title: 'Contribute more to the opensource repo',
        link: '#'
      },
      {
        title: 'Contribute content on HackQuest',
        link: '#'
      },
      {
        title: 'Join as an Advocate',
        link: '#'
      }
    ]
  }
];

export const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];
const CURRENT_YEAR = new Date().getFullYear();
const START_YEAR = 1949;

export const YEARS = Array.from({ length: CURRENT_YEAR - START_YEAR + 1 }).map((_, i) => (CURRENT_YEAR - i).toString());

export const EMPLOYMENT_TYPE = [
  {
    label: 'Full-time',
    value: 'FULL_TIME'
  },
  {
    label: 'Part-time',
    value: 'PART_TIME'
  },
  {
    label: 'Contractor',
    value: 'CONTRACTOR'
  },
  {
    label: 'Internship',
    value: 'INTERNSHIP'
  }
];
