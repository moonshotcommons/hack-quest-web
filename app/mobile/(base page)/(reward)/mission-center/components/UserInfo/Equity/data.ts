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
    label: 'More to come',
    level: 10
  },
  {
    label: 'More to come',
    level: 20
  },
  {
    label: 'More to come',
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
    rights: ['More to come']
  },
  {
    level: '20-29',
    role: 'Web3 Explorer',
    rights: ['More to come']
  },
  {
    level: '30+',
    role: 'Web3 Questmaster',
    rights: ['More to come']
  }
];
