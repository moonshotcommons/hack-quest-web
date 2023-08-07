/** 勋章 */
export interface BadgesType {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export enum MissionType {
  DAILY_QUESTS = 'DAILY_QUESTS',
  MILESTONES = 'MILESTONES',
  SEVEN_DAYS_SIGNUP = 'SEVEN_DAYS_SIGNUP',
  JOIN_DISCORD = 'JOIN_DISCORD'
}

export enum MissionSubType {
  COURSE_COMPLETION = 'COURSE_COMPLETION',
  QUEST_WINNING_STREAK = 'QUEST_WINNING_STREAK',
  TRACK_COMPLETION = 'TRACK_COMPLETION'
}
/** 用户等级 */
export interface UserLevelType {
  level: number;
  expToday: number;
  expCurrent: number;
  expNextLevel: number;
  badges: BadgesType[];
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
  subType: MissionSubType | '';
  exp: number;
  progress: ProgressType;
}
