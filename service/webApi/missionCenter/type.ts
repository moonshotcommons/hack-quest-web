import { RegisterType } from '../user/type';
import { HackathonTypeVotesRoleType } from '../resourceStation/type';

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

export enum TreasureStatus {
  UNOBTAIN = 'unobtain',
  UNOPEN = 'unopen',
  OPENED = 'opened'
}
export interface UserTreasuresType {
  id: string;
  status: TreasureStatus;
}

export enum TreasureSource {
  INVITE_USER = 'inviteUser'
}
export interface InviteTreasureType {
  coin: number;
  exp: number;
  id: string;
  source: TreasureSource;
  status: TreasureStatus;
  userId: string;
}

export interface InviteResponseType {
  inviteCount: number;
  treasures: InviteTreasureType[];
  targets: number[];
}
/** 进度 */
export interface ProgressType {
  id: string;
  completed: boolean;
  claimed: boolean;
  progress: number[];
}

/** mission */

export enum MissionStatus {
  UNCOMPLETED = 'unCompleted',
  UNCLAIM = 'unClaim',
  CLAIMED = 'claimed',
  RESTORE = 'restore'
}
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
  status: MissionStatus;
}

export interface UserLevelRankType {
  avatar: string;
  email: string;
  exp: number;
  id: string;
  inviteCode: string;
  name: string;
  nickname: string;
  rank: number;
  registerType: RegisterType;
  voteRole: HackathonTypeVotesRoleType;
}

export interface UserLevelRankResponseType {
  allTimeMyRank: UserLevelRankType;
  allTimeRanks: UserLevelRankType[];
  dayMyRank: UserLevelRankType;
  dayRanks: UserLevelRankType[];
  monthMyRank: UserLevelRankType;
  monthRanks: UserLevelRankType[];
}

export interface DigTreasuresResponse {
  success: boolean;
  coin: number;
  exp: number;
}

export interface OpenTreasuresResponse {
  id: string;
  exp: number;
  coin: number;
}

export interface ClaimResponse {
  id: string;
  exp: number;
  coin: number;
}
