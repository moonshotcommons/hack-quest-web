import { CustomComponent } from '@/components/ComponentRenderer/type';
import { UserCertificateInfo } from '../campaigns/type';

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
  role: UserRole;
  status: string;
  nickname: string;
  username: string;
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

export interface Attestation {
  id: string;
  userId: string;
  creatorId: string;
  creator: {
    id: string;
    nickname: string;
    username: string;
    avatar: string;
  };
  sourceId: string;
  type: string;
  attest: boolean;
  comment: string;
  chain: Record<string, any>;
  createdAt: string;
  updatedAt: string;
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
  attestations: Attestation[];
}

export interface UserHackathonType {
  id: string;
  role: string;
  hackathonName: string;
  projectTitle: string;
  location: string;
  isCurrentWork: boolean;
  startDate: string;
  endDate?: string;
  description: string;
  winner?: boolean;
  attestations: Attestation[];
}

export interface GithubActivityType {
  name: string;
  languages: Record<string, number>;
  totalContributor: number;
  totalFork: number;
  totalStar: number;
}
export interface UserProfileType {
  id: string;
  bio: string;
  location: string;
  experience: number;
  techStack: string[];
  progress: [number, number];
  backgroundImage?: string;
  personalLinks: Record<string, string>;
  githubActivity: GithubActivityType;
  onChainActivity: any;
  workExperiences: UserExperienceType[];
  hackathonExperiences: UserHackathonType[];
  certifications: UserCertificateInfo[];
  user: {
    id: string;
    avatar: string;
    email: string;
    name: string | null;
    nickname: string;
    username: string;
    inviteCode: string;
    registerType: RegisterType;
  };
  resumes: {
    id: string;
    userId: string;
    name: string;
    file: string;
  }[];
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

export enum UserRole {
  ADMIN = 'ADMIN',
  ORGANIZATION = 'ORGANIZATION',
  USER = 'USER',
  CONTENT = 'CONTENT'
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

export interface DailyChallengeType {
  challenges: {
    links: { link: string; title: string; description: string }[];
    id: string;
    type: string;
    content: CustomComponent;
    track?: string;
    category?: string;
    createdAt: string;
    updatedAt: string;
  }[];
  progress: number;
  completed: boolean;
  correct: number;
}

export interface AttestationType {
  id: string;
  username: string;
  sourceId: string;
  type: 'Certification' | 'Experience' | 'Hackathon';
  attest: boolean;
  comment?: string;
  chain?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export type CreateAttestationInput = Omit<AttestationType, 'id' | 'createdAt' | 'updatedAt'>;
