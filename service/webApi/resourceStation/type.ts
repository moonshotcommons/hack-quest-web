import { CustomComponent } from '@/components/ComponentRenderer/type';

export enum HackathonStatusType {
  ON_GOING = 'ongoing',
  PAST = 'past'
}

export interface MentorType {
  name: string;
  title: string;
  picture: string;
}

export interface HackathonRewardType {
  desc: string;
  name: string;
  place: number[];
}
export interface HackathonScheduleType {
  desc: string;
  time: string;
  isExpand?: boolean;
  children: {
    desc: string;
    link?: string;
    time: string;
    address?: string;
  }[];
}
export interface HackathonType {
  id: string;
  name: string;
  image: string;
  about: string;
  theme: string;
  participants: string[];
  hosts: Omit<MentorType, 'title'>[];
  coHosts: Omit<MentorType, 'title'>[];
  startTime: string;
  endTime: string;
  address: string;
  applyLink: string;
  guestsAndMentors: MentorType[];
  mediaPartners: MentorType[];
  communityPartners: MentorType[];
  status: HackathonStatusType;
  alias: string;
  rewardTime: string;
  rewards: HackathonRewardType[];
  openTime: string;
  reviewTime: string;
  schedule: HackathonScheduleType[];
}

export interface HackathonDataType {
  data: HackathonType[];
  total: number;
}

export type ProjectType = {
  id: string;
  name: string;
  description: string;
  video: string;
  introduction: string;
  team: string;
  hackathonId: string;
  hackathonName: string;
  tracks: string[];
  featured: boolean;
  apolloDay: boolean;
  thumbnail: string;
  alias: string;
};

export interface ProjectDataType {
  data: ProjectType[];
  total: number;
}

export interface BlogSearchType {
  keyword?: string;
  category?: string;
  sort?: string;
}

export type PagedType = {
  page?: number;
  limit?: number;
};

export interface BlogType {
  id: string;
  title: string;
  description: string;
  image: string;
  categories: string[];
  content: any;
  creatorName: string;
  duration: number;
  top: number;
  publishDate: string;
  createdAt: string;
  updatedAt: string;
  alias: string;
  tracks: string[];
}

export type BlogContentType = {
  content: CustomComponent[];
};

export type BlogDetailType = BlogType & BlogContentType;

export enum ResourceFrom {
  BLOG = 'blog',
  GLOSSARY = 'glossary'
}

export enum CoustomKeywordType {
  GLOSSARY = 'Glossary'
}

export enum EventStatus {
  UPCOMING = 'upcoming',
  IN_PROGRESS = 'inProgress',
  PAST = 'past'
}

export interface EventsType {
  id: string;
  name: string;
  description: string;
  medias: string[];
  tags: string[];
  location: string;
  startTime: string;
  endTime: string;
  status: EventStatus;
  eventUrl?: string;
}

export enum HackathonRegisterStep {
  Name = 'NAME',
  Contact = 'CONTRACT',
  Bio = 'BIO',
  SubmissionType = 'SUBMISSION_TYPE',
  Review = 'REVIEW'
}

export interface HackathonRegisterProjectInfo {
  id: string;
  name: string;
  status: ProjectSubmitStepType;
}
export interface HackathonRegisterInfo {
  id: string;
  hackathonId: string;
  userId: string;
  firstName: string | null;
  lastName: string | null;
  weChat: string | null;
  telegram: string | null;
  team: HackathonTeam;
  bio: string | null;
  status: HackathonRegisterStep;
  createdAt: string;
  updatedAt: string;
  avatar: string;
  isRegister: boolean;
  isSubmit: boolean;
  project?: HackathonRegisterProjectInfo;
}

export interface RegisterInfoBody {
  firstName?: string | null;
  lastName?: string | null;
  weChat?: string | null;
  telegram?: string | null;
  bio?: string | null;
  status?: HackathonRegisterStep;
}

export interface HackathonTeam {
  code?: string;
  creatorId?: string;
  id?: string;
  name?: string;
}

export interface TeamMemberInfo {
  userId: string;
  firstName: string;
  lastName: string;
  weChat: string;
  telegram: string;
  bio: string;
  isAdmin: boolean;
  avatar: string;
}

export interface HackathonTeamDetail {
  id: string;
  name: string;
  creatorId: string;
  createdAt: string;
  updatedAt: string;
  members: TeamMemberInfo[];
}

export enum ProjectSubmitStepType {
  INFO = 'INFO',
  PITCH_VIDEO = 'PITCH_VIDEO',
  DEMO = 'DEMO',
  OTHERS = 'OTHERS',
  WALLET = 'WALLET',
  REVIEW = 'REVIEW'
}

export interface ProjectSubmitBody {
  name?: string;
  hackathonId: string;
  prizeTrack?: string;
  description?: string;
  thumbnail?: string;
  video?: string;
  demo?: string;
  introduction?: string;
  githubLink?: string;
  isOpenSource?: boolean;
  wallet?: string;
  status?: ProjectSubmitStepType;
  team?: string;
  tracks?: string[];
  creatorId?: string;
}
