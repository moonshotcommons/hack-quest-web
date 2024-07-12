import { AwardIcon, LinkIcon, MonitorIcon, TargetIcon, TerminalIcon } from 'lucide-react';

export const INDICATORS = [
  {
    title: 'Technical Ability',
    icon: TerminalIcon,
    content: [
      {
        title: 'Join more hackathons',
        link: '/hackathons'
      },
      {
        title: 'Earn more Certificates',
        link: '/certificates'
      },
      {
        title: 'Increase Web3 related commit on Github',
        link: '/github-commits'
      }
    ]
  },
  {
    title: 'On-chain Activity',
    icon: LinkIcon,
    content: [
      {
        title: 'More on-chain interactions',
        link: '/on-chain-interactions'
      },
      {
        title: 'Deploy more smart contract',
        link: '/deploy-smart-contracts'
      }
    ]
  },
  {
    title: 'Reputation',
    icon: AwardIcon,
    content: [
      {
        title: 'Get more attestations',
        link: '/attestations'
      },
      {
        title: 'Complete your profile',
        link: '/profile'
      },
      {
        title: 'Add Web3 related working experience',
        link: '/work-experience'
      }
    ]
  },
  {
    title: 'Influence',
    icon: TargetIcon,
    content: [
      {
        title: 'Increase Stars for your Web3 Repo',
        link: '/web3-repo-stars'
      },
      {
        title: 'Connect more socials',
        link: '/connect-socials'
      },
      {
        title: 'Increase attestations from verified individuals',
        link: '/verified-attestations'
      }
    ]
  },
  {
    title: 'Contribution',
    icon: MonitorIcon,
    content: [
      {
        title: 'Contribute more to the opensource repo',
        link: '/opensource-repo'
      },
      {
        title: 'Contribute content on HackQuest',
        link: '/hackquest'
      },
      {
        title: 'Join as an Advocate',
        link: '/advocate'
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

export const YEARS = Array.from({ length: CURRENT_YEAR - START_YEAR + 1 }).map((_, i) => (START_YEAR + i).toString());
