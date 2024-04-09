export interface EquityListType {
  label: string;
  level: number;
}
export const equityList: EquityListType[] = [
  {
    label: 'learningCertificate',
    level: 0
  },
  {
    label: 'moreToCome',
    level: 10
  },
  {
    label: 'moreToCome',
    level: 20
  },
  {
    label: 'moreToCome',
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
    role: 'web3Newbie',
    rights: ['learningCertificate']
  },
  {
    level: '10-19',
    role: 'web3Explorer',
    rights: ['moreToCome']
  },
  {
    level: '20-29',
    role: 'web3Explorer',
    rights: ['moreToCome']
  },
  {
    level: '30+',
    role: 'web3Questmaster',
    rights: ['moreToCome']
  }
];
