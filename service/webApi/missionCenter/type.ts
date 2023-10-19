/** 勋章 */
export interface BadgesType {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export enum MissionType {
  DAILY_BONUS = 'DAILY_BONUS',
  BEGINNER_REWARDS = 'BEGINNER_REWARDS',
  MILESTONES = 'MILESTONES',
  DAILY_QUEST = 'DAILY_QUEST'
}

export enum MissionSubType {
  REGISTER_ACCOUNT = 'REGISTER_ACCOUNT',
  JOIN_DISCORD = 'JOIN_DISCORD',
  LINK_METAMASK = 'LINK_METAMASK',
  ENROLL_LEARNING_TRACK = 'ENROLL_LEARNING_TRACK',
  INVITE_USER = 'INVITE_USER'
}

export enum BeginnerRewardsType {
  FOLLOW_TWITTER = 'FOLLOW_TWITTER',
  JOIN_DISCORD = 'JOIN_DISCORD',
  UPDATE_PROFILE = 'UPDATE_PROFILE'
}
/** 用户等级 */
export interface UserLevelType {
  level: number;
  expNextLevel: number;
  expCurrentLevel: number;
  exp: number;
  id?: string;
}
/** 用户等级 */
export interface UserCoinType {
  coin: number;
  id?: string;
}
/** 用户等级 */
export interface UserTreasuresType {
  id: string;
}
/** 进度 */
export interface ProgressType {
  id: string;
  completed: boolean;
  claimed: boolean;
  progress: number[];
}

/** mission */
export interface MissionDataType {
  id: string;
  name: string;
  description: string;
  icon: string;
  type: MissionType;
  subType: MissionSubType & '';
  exp: number;
  coin: number;
  progress: ProgressType;
}

export interface DigTreasuresResponse {
  success: boolean;
  treasureId?: string;
}
