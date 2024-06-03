import { CertificationType } from '../campaigns/type';

export interface Response {
  id: string;
}

export interface RegisterParamsType {
  email: string;
  password: string;
  reenterPassword: string;
  inviteCode?: string;
}

export interface RegisterResponse {
  id: string;
  email: string;
  name: string;
  nickname: string;
  avatar: string;
  role: string;
  status: string;
  registerType: string;
}

export interface LoginParamsType {
  email: string;
  password: string;
  keepMeLoggedIn: boolean;
}

export interface LoginResponse {
  id: string;
  email: string;
  name: string;
  avatar: string;
  role: string;
  status: string;
  nickname: string;
  // registerType: string;
  inviteCode: string;
  token: string;
  voteRole: string;
  inviteCount: number;
}

export enum ForgetPasswordErrorStatusType {
  /** 发送邮件失败 */
  SEND_EMAIL_ERROR = 400,
  /** 邮箱不存在 */
  EMAIL_NOT_EXIST = 404
}

export enum ThirdPartyAuthType {
  EMAIL = 'Email',
  GOOGLE = 'Google',
  GITHUB = 'Github',
  METAMASK = 'Metamask'
}

export enum WorkExperienceType {
  FULL_TIME = 'FULL_TIME',
  PART_TIME = 'PART_TIME',
  CONTRACTOR = 'CONTRACTOR',
  INTERNSHIP = 'INTERNSHIP'
}

export enum RegisterType {
  REGISTER = 'register',
  GOOGLE = 'google',
  GITHUB = 'github',
  WALLET = 'wallet'
}

export interface UserExperienceType {
  id: string;
  title: string;
  companyName: string;
  employmentType: WorkExperienceType;
  location: string;
  isCurrentWork: boolean;
  startDate: string;
  endDate?: string;
  description: string;
}

export interface UserHackathonType {
  id: string;
  role: string;
  hackathonName: string;
  location: string;
  isCurrentWork: boolean;
  startDate: string;
  endDate?: string;
  description: string;
}

export interface GithubActivityType {
  languages: Record<string, number>;
  totalContributor: number;
  totalFork: number;
  totalStar: number;
}
export interface UserProfileType {
  id: string;
  location: string;
  experience: number;
  techStack: string[];
  backgroundImage?: string;
  personalLinks: Record<string, string>;
  githubActivity: GithubActivityType;
  onChainActivity: any;
  workExperiences: UserExperienceType[];
  hackathonExperiences: UserHackathonType[];
  certifications: CertificationType[];
  user: {
    avatar: string;
    email: string;
    name: string | null;
    nickname: string;
    inviteCode: string;
    registerType: RegisterType;
  };
}

export interface UserPersonalType {
  location: string;
  experience: number;
  techStack: string[];
  nickname: string;
}

export interface PersonalLinksType {
  x: string;
  github: string;
  linkedIn: string;
  telegram: string;
}

export interface UserLearnedCountType {
  certificationCount: number;
  courseCount: number;
}

export enum ConnectType {
  WALLET = 'wallet',
  TWITTER = 'twitter',
  DISCORD = 'discord'
}

export enum NotificateType {
  MESSAGE = 'MESSAGE',
  UPDATE = 'UPDATE',
  REACTION = 'REACTION'
}

export interface NotificationContentDescType {
  content: string;
  link: string;
  title: string;
}
export interface NotificationContentType {
  content: string;
  link: string;
  description: NotificationContentDescType[];
}
export interface NotificationType {
  userId: string;
  isRead: boolean;
  id: string;
  content: NotificationContentType;
  avatar: string;
  createdAt: string;
  type: NotificateType;
}
