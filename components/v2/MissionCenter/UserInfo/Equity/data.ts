export interface EquityListType {
  label: string;
  level: number;
}
export const equityList: EquityListType[] = [
  {
    label: 'Learning for certificate',
    level: 0
  },
  {
    label: 'Create courses',
    level: 10
  },
  {
    label: 'Eligible for airdrop',
    level: 10
  },
  {
    label: 'Improve course content',
    level: 10
  },
  {
    label: 'Apply for community advocate',
    level: 10
  },
  {
    label: 'Curate courses',
    level: 20
  },
  {
    label: 'Platform governance',
    level: 30
  },
  {
    label: 'Censor courses',
    level: 30
  }
];
export interface EquityTipType {
  level: string;
  role: string;
  rights: string[];
}
export const equityTip: EquityTipType[] = [
  {
    level: '1-9',
    role: 'Web3 Newbie',
    rights: ['Learning for certificate']
  },
  {
    level: '10-19',
    role: 'Web3 Explorer',
    rights: [
      'Create courses',
      'Eligible for airdrop',
      'Improve course content',
      'Apply for community advocate'
    ]
  },
  {
    level: '20-29',
    role: 'Web3 Explorer',
    rights: ['Curate courses']
  },
  {
    level: '30+',
    role: 'Web3 Questmaster',
    rights: ['Platform governance', 'Censor courses']
  }
];
