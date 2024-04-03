export enum ConnectType {
  WALLET = 'wallet',
  TWITTER = 'twitter',
  DISCORD = 'discord',
  INVITE_CODE = 'invite code'
}

export const connectKeyMap = [
  {
    key: ConnectType.WALLET,
    label: 'Connect Wallet',
    connected: false
  },
  {
    key: ConnectType.TWITTER,
    label: 'Connect Twitter',
    connected: false
  },
  {
    key: ConnectType.DISCORD,
    label: 'Connect Discord',
    connected: false
  },
  {
    key: ConnectType.INVITE_CODE,
    label: 'Enter Invite Code',
    connected: false
  }
];
