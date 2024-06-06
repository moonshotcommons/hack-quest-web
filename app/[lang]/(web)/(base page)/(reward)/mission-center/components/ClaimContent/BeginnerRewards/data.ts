import IconHack from '@/public/images/mission-center/icon_hack.png';
import IconMetaMask from '@/public/images/mission-center/icon_meta_mask.png';
import IconDiscord from '@/public/images/mission-center/icon_discord_communitypng.png';
import { MissionSubType } from '@/service/webApi/missionCenter/type';

export enum RewardsCardType {
  DISCORD = 'discord',
  SHARE = 'share'
}
type RewardsCardDataType = {
  [k in MissionSubType]: {
    targetIcon: any;
    unClaimPath: string;
    unClaimText: string;
    type?: RewardsCardType;
  };
};
export const rewardsCardData: RewardsCardDataType = {
  REGISTER_ACCOUNT: {
    targetIcon: IconHack,
    unClaimPath: '/',
    unClaimText: 'registerAccount'
  },
  JOIN_DISCORD: {
    targetIcon: IconDiscord,
    unClaimPath: '',
    unClaimText: 'joinDiscord',
    type: RewardsCardType.DISCORD
  },
  LINK_METAMASK: {
    targetIcon: IconMetaMask,
    unClaimPath: '/',
    unClaimText: 'linkWithMetaMask'
  },
  ENROLL_LEARNING_TRACK: {
    targetIcon: IconHack,
    unClaimPath: '/learning-track',
    unClaimText: 'goToLearningTrack'
  },
  INVITE_USER: {
    targetIcon: IconHack,
    unClaimPath: '/',
    unClaimText: 'shareInviteCode',
    type: RewardsCardType.SHARE
  }
};
