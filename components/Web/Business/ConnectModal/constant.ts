export enum ConnectType {
  WALLET = 'wallet',
  TWITTER = 'twitter',
  DISCORD = 'discord',
  INVITE_CODE = 'invite code'
}

export const connectKeyMap = [
  {
    key: ConnectType.WALLET,
    label: 'connectWallet',
    connected: false
  },
  {
    key: ConnectType.TWITTER,
    label: 'twitterVerify',
    connected: false
  },
  {
    key: ConnectType.DISCORD,
    label: 'connectDiscord',
    connected: false
  },
  {
    key: ConnectType.INVITE_CODE,
    label: 'inputInviteCode',
    connected: false
  }
];
