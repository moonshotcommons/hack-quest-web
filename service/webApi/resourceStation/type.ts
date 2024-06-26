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
  totalPlace: number;
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

export interface HackathonMemberType {
  userId: string;
  avatar: string;
  bio: string;
  firstName: string;
  lastName: string;
  team: Record<string, any>;
  telegram: string;
  weChat: string;
}

export enum HackathonTypeVotesRoleType {
  USER = 'USER',
  ADVOCATE = 'ADVOCATE',
  JUDGE = 'JUDGE'
}

export interface HackathonTypeVotesType {
  USER: number;
  ADVOCATE: number;
  JUDGE: number;
}
export interface HackathonType {
  id: string;
  name: string;
  image: string;
  about: CustomComponent[];
  theme: CustomComponent[];
  resources: CustomComponent[];
  participants: number;
  memberCount: number;
  hosts: Omit<MentorType, 'title'>[];
  coHosts: Omit<MentorType, 'title'>[];
  startTime: string;
  endTime: string;
  address: string;
  applyLink: string;
  guestsAndMentors: MentorType[];
  sections: {
    hosts: MentorType[];
    venue: MentorType[];
    coHosts: MentorType[];
    goldSponsor: MentorType[];
    titleSponsor: MentorType[];
    trackPartner: MentorType[];
    bronzeSponsor: MentorType[];
    mediaPartners: MentorType[];
    silverSponsor: MentorType[];
    platinumSponsor: MentorType[];
    guestsAndMentors: MentorType[];
    communityPartners: MentorType[];
  };
  mediaPartners: MentorType[];
  communityPartners: MentorType[];
  partners: MentorType[];
  status: HackathonStatusType;
  alias: string;
  rewardTime: string;
  allowSubmission: boolean;
  rewards: HackathonRewardType[];
  openTime: string;
  reviewTime: string;
  schedule: HackathonScheduleType[];
  participation?: HackathonRegisterInfo;
  members: HackathonMemberType[];
  version: string;
  voteRules: CustomComponent[];
  votes: HackathonTypeVotesType;
  remainingVote: number;
  projectCount: number;
  totalPlace: number;

  speakersAndJudges: HackathonMemberType[];
  sponsors: HackathonMemberType[];
}

export interface JoinedHackathonType {
  hackathons: HackathonType[];
  stats: {
    registered: number;
    submitted: number;
    winner: number;
    projectVoted: number;
    votes: {
      [key: string]: number;
    };
  };
}

export interface HackathonVoteType extends HackathonType {
  projectCount: number;
  remainingVote: number;
}

export interface HackathonDataType {
  data: HackathonType[];
  total: number;
}

export interface ProjectTeamType {
  code: string;
  creatorId: string;
  hackathonId: string;
  id: string;
  name: string;
}
export interface ProjectMemberType {
  avatar: string;
  bio: string;
  firstName: string;
  lastName: string;
  telegram: string;
  email: string;
  userId: string;
  weChat: string;
  isAdmin: boolean;
}

export type ProjectType = {
  id: string;
  name: string;
  description: string;
  video: string;
  introduction: string;
  team: ProjectTeamType;
  hackathonId: string;
  location: string;
  hackathonName: string;
  prizeTrack: string;
  tracks: string[];
  status: ProjectSubmitStepType;
  featured: boolean;
  apolloDay: boolean;
  thumbnail: string;
  alias: string;
  demo: string;
  wallet: string;
  isOpenSource: boolean;
  githubLink: string;
  members: ProjectMemberType[];
  vote: number;
  isSubmit: boolean;
  efrog: boolean;
  croak: boolean;
  submitType: string;
  links: string | Record<string, string>;
  tagline: string;
  technologies: string;
  solvedProblem: string;
  challenges: string;
  teamID: string;
  roomNumber: string;
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
  isSubmit: boolean;
  winner: boolean;
  vote: number;
}
export interface HackathonRegisterInfo {
  id: string;
  email: string;
  hackathonId: string;
  userId: string;
  firstName: string | null;
  lastName: string | null;
  weChat: string | null;
  telegram: string | null;
  team: HackathonTeam | null;
  bio: string | null;
  status: HackathonRegisterStep;
  createdAt: string;
  updatedAt: string;
  avatar: string;
  isRegister: boolean;
  isSubmit: boolean;
  project?: HackathonRegisterProjectInfo;
  remainingVote: number;
  totalVote: number;
  voteRole: HackathonTypeVotesRoleType;
  discord: string;
  collegeName: string;
}

export interface RegisterInfoBody {
  firstName?: string | null;
  lastName?: string | null;
  weChat?: string | null;
  telegram?: string | null;
  email?: string;
  bio?: string | null;
  status?: HackathonRegisterStep;
  discord?: string;
  collegeName?: string;
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
  PROJECT = 'PROJECT',
  PITCH_VIDEO = 'PITCH_VIDEO',
  DEMO = 'DEMO',
  LINKS = 'LINKS',
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
  location?: ProjectLocation;
  githubLink?: string;
  isOpenSource?: boolean;
  wallet?: string;
  status?: ProjectSubmitStepType;
  team?: string;
  tracks?: string[];
  creatorId?: string;
}

export enum ProjectLocation {
  AMERICAS = 'AMERICAS',
  ASIA_PACIFIC = 'ASIA_PACIFIC',
  EUROPE = 'EUROPE',
  MIDDLE_EAST_AFRICA = 'MIDDLE_EAST_AFRICA',
  OTHER = 'OTHER'
}

export enum BlockChainType {
  EVM = 'EVM',
  SOLANA = 'SOLANA',
  SUI = 'SUI',
  NEAR = 'NEAR'
}

export interface FaucetType {
  id: string;
  name: string;
  type: BlockChainType;
  rpcUrl: string;
  chainId: string;
  symbol: string;
  blockBrowserUrl: string;
  amount: number;
  owner: string;
  balance: number;
  intervalTime: number;
  thumbnail: string;
}

export interface FaucetRecordType {
  claimTime: string;
  exportUrl: string;
  id: string;
}

export interface ProjectRankType {
  total: number;
  rank: number;
}
