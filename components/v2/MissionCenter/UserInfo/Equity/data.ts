export interface EquityListType {
  label: string;
  level: number;
}
export const equityList: EquityListType[] = [
  {
    label: 'learning for certificate',
    level: 0
  },
  {
    label: 'create courses',
    level: 10
  },
  {
    label: 'eligible for airdrop',
    level: 10
  },
  {
    label: 'improve course content',
    level: 10
  },
  {
    label: 'apply for community advocate',
    level: 10
  },
  {
    label: 'curate courses',
    level: 20
  },
  {
    label: 'platform governance',
    level: 30
  },
  {
    label: 'censor courses',
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
    rights: ['learning for certificate']
  },
  {
    level: '10-19',
    role: 'Web3 Explorer',
    rights: [
      'create courses',
      'eligible for airdrop',
      'improve course content',
      'apply for community advocate'
    ]
  },
  {
    level: '20-29',
    role: 'Web3 Explorer',
    rights: ['curate courses']
  },
  {
    level: '30+',
    role: 'Web3 Questmaster',
    rights: ['platform governance', 'censor courses']
  }
];
