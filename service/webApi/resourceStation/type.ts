import { CustomComponent } from '@/components/ComponentRenderer/type';
import {
  ApplicationSectionType,
  CustomComponentConfig,
  PresetComponentConfig,
  SubmissionSectionType
} from '@/components/HackathonCreation/type';

export enum HackathonStatusType {
  ON_GOING = 'ongoing',
  DRAFT = 'draft',
  PAST = 'past'
}

export interface MentorType {
  name: string;
  title: string;
  picture: string;
  id: string;
}

export interface HackathonPartners {
  title: string;
  list: MentorType[];
}

export interface HackathonRewardType {
  id: string;
  hackathoId: string;
  mode: string;
  rule: string;
  name: string;
  totalRewards: number;
  currency: string;
  rewards: {
    id: string;
    label: string;
    value: number;
  }[];
}
export interface HackathonScheduleType {
  id: string;
  eventName: string;
  startTime: string;
  endTime: string;
  speakerNames: string;
  description: string;
  link: string;
  address: string;
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

export interface HacakthonFaqType {
  question: string;
  answer: string;
  id: string;
}

export enum HackathonSubmissionStatus {
  INFO = 'INFO',
  APPLICATION = 'APPLICATION',
  SUBMISSION = 'SUBMISSION',
  LINKS = 'LINKS',
  COVER = 'COVER',
  TIMELINE = 'TIMELINE',
  REWARDS = 'REWARDS',
  JUDGING = 'JUDGING'
}

export interface HackathonApplicationLabelType {
  id: string;
  property: {
    label: string;
    name: string;
    placeholder: string;
  };
  required: boolean;
  selected: boolean;
  optional: boolean;
  type: string;
}

export interface HackathonApplicationPropertyType {
  id: string;
  property: {
    maxSize: number;
    minSize: number;
    type: string;
  };
  type: string;
}
export interface HackathonApplicationType {
  About: HackathonApplicationLabelType[];
  Contact: HackathonApplicationLabelType[];
  OnlineProfiles: HackathonApplicationLabelType[];
  ApplicationType: HackathonApplicationPropertyType;
}

export interface HackathonSubmissionType {
  Additions: HackathonApplicationLabelType[];
  BasicInfo: HackathonApplicationLabelType[];
  ProjectDetail: HackathonApplicationLabelType[];
  Videos: HackathonApplicationLabelType[];
}

export interface HackathonInfoSectionsType {
  sponsors: HackathonPartners;
  partners: HackathonPartners;
  mediaPartners: HackathonPartners;
  speakers: HackathonPartners;
  communityPartners: HackathonPartners;
  coHosts: HackathonPartners;
  schedule: {
    title: string;
    list: HackathonScheduleType[];
  };
  faqs: {
    title: string;
    list: HacakthonFaqType[];
  };
  resource: CustomComponent[];
  theme: CustomComponent[];
  criteria: CustomComponent[];
}

export interface HackathonInfoType {
  address: string;
  application: HackathonApplicationType;
  submission: HackathonSubmissionType;
  sections: HackathonInfoSectionsType;
  conduct: string;
  description: string | CustomComponent[];
  host: string;
  image: string;
  intro: string;
  mode: string;
  theme: string;
  resource: string;
  allowSubmission: boolean;
}

export interface HackathonJudgeAccountType {
  email: string;
  nickname: string;
  avatar: string;
}

export interface HackathonJudgeType {
  id: string;
  judgeAccounts: HackathonJudgeAccountType[];
  criteria: string;
  votesProportion: number[];
  judgeMode: string;
  judgeProjectVote: number;
  judgeTotalVote: number;
  projectJudgeCount: number;
  voteMode: string;
  rewardName: string;
  rewardId: string;
  disableJudge: boolean;
}

export interface HackathonLinkType {
  email: string;
  id: string;
  links: Record<string, any>;
  website: string;
}

export interface HackathonTimeLineType {
  id: string;
  openReviewSame: boolean;
  registrationOpen: string;
  registrationClose: string;
  submissionOpen: string;
  submissionClose: string;
  rewardTime: string;
  timeZone: string;
}

export type HackathonTimeLineKeyType =
  | 'registrationOpen'
  | 'registrationClose'
  | 'submissionOpen'
  | 'submissionClose'
  | 'rewardTime';

export type HackathonInfoParterKeys = 'partners' | 'mediaPartners' | 'communityPartners' | 'coHosts';
export type HackathonInfoSponsorsKeys = 'speakers' | 'sponsors';
export type HackathonInfoSPKeys = HackathonInfoParterKeys | HackathonInfoSponsorsKeys;
export interface HackathonType {
  id: string;
  name: string;
  info: HackathonInfoType;
  judge: HackathonJudgeType[];
  links: HackathonLinkType;
  memberCount: number;
  enable: boolean;
  progress: string[];
  // sections: {
  //   hosts: MentorType[];
  //   venue: MentorType[];
  //   coHosts: MentorType[];
  //   goldSponsor: MentorType[];
  //   titleSponsor: MentorType[];
  //   trackPartner: MentorType[];
  //   bronzeSponsor: MentorType[];
  //   mediaPartners: MentorType[];
  //   silverSponsor: MentorType[];
  //   platinumSponsor: MentorType[];
  //   guestsAndMentors: MentorType[];
  //   communityPartners: MentorType[];
  // };
  allowSubmission: boolean;
  alias: string;
  status: HackathonSubmissionStatus;
  members: HackathonMemberType[];
  sectionSequences: string[];
  participation?: HackathonRegisterInfo;
  rewards: HackathonRewardType[];
  timeline: HackathonTimeLineType;
  votes: HackathonTypeVotesType;
  totalPrize: number;
  projectCount: number;
  remainingVote: number;
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

export type HackathonInfoAboutType = {
  firstName: string;
  gender: string;
  lastName: string;
  location: string;
  resume: string;
} & Record<string, any>;

export type HackathonInfoContactType = {
  discord: string;
  email: string;
  phoneNumber: string;
  telegram: string;
} & Record<string, any>;

export type HackathonInfoOnlineProfilesType = {
  facebook: string;
  farcaster: string;
  github: string;
  linkedIn: string;
  qq: string;
  whatsApp: string;
} & Record<string, any>;
export interface ProjectMemberType {
  avatar: string;
  info: {
    [ApplicationSectionType.About]?: HackathonInfoAboutType;
    [ApplicationSectionType.Contact]?: HackathonInfoContactType;
    [ApplicationSectionType.OnlineProfiles]?: HackathonInfoOnlineProfilesType;
  };
  isAdmin: boolean;
  userId: string;
}

export interface BasicInfo {
  logo: string;
  name: string;
  alias?: string;
  location: string;
  prizeTrack: string;
  tracks: string[];
  wallet: string;
  fields: Record<string, any>;
}

export interface ProjectDetail {
  oneLineIntro: string;
  detailedIntro: string;
  teamBackground: string;
  progress: string;
  fields: Record<string, any>;
}

export interface Videos {
  pitchVideo: string;
  demoVideo: string;
}

export interface Additions {
  isOpenSource: boolean;
  contract: string;
  fundraisingStatus: string;
  githubLink: string;
  fields: Record<string, any>;
}

export type ProjectType = {
  id: string;
  name: string;
  team: ProjectTeamType;
  hackathonId: string;
  hackathonName: string;
  location: string;
  addition: Partial<Additions>;
  detail: Partial<ProjectDetail>;
  prizeTrack: string;
  tracks: string[];
  status: SubmissionSectionType | 'Review';
  creatorId: string;
  featured: boolean;
  logo: string;
  alias: string;
  demoVideo: string;
  pitchVideo: string;
  fields: Record<string, { label: string; value: any }>;
  wallet: string;
  members: ProjectMemberType[];
  vote: number;
  isSubmit: boolean;
  submitType: string;
  teamId: string;
  winner: false;
  //! 没有这个字段了
  apolloDay?: string;
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
  status: ApplicationSectionType | 'Review';
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
  info: Record<ApplicationSectionType, object>;
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
  info: Record<string, any>;
  isAdmin: boolean;
  avatar: string;
}

export interface HackathonTeamDetail {
  id: string;
  name: string;
  creatorId: string;
  createdAt: string;
  hackathonId: string;
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

export interface SimpleHackathonInfo {
  id: string;
  name: string;
  alias: string;
  creatorId: string;
  status: string;
  sectionSequences: [];
  createdAt: Date;
  updatedAt: Date;
  info: {
    application: {
      [ApplicationSectionType.ApplicationType]: {
        id: string;
        type: string;
        property: {
          type?: 'Solo or Group' | 'Solo Only' | 'Group Only';
          minSize?: number;
          maxSize?: number;
        };
      };
      [ApplicationSectionType.About]: (PresetComponentConfig | CustomComponentConfig)[];
      [ApplicationSectionType.Contact]: (PresetComponentConfig | CustomComponentConfig)[];
      [ApplicationSectionType.OnlineProfiles]: (PresetComponentConfig | CustomComponentConfig)[];
    };
    submission: {
      [Key in SubmissionSectionType]: (PresetComponentConfig | CustomComponentConfig)[];
    };
  };
  rewards: { name: string }[];
  timeline: {
    id: string;
    timeZone: string;
    openReviewSame: boolean;
    registrationOpen: string;
    registrationClose: string;
    submissionClose: string;
    reviewTimeEnd: string;
    rewardTime: string;
  };
}

/** 项目提交时候接口需要的表单参数 */
export interface ProjectSubmitBody {
  status?: SubmissionSectionType | 'Review';
  hackathonId?: string;
  basicInfo?: Record<string, any>;
  videos?: Record<string, any>;
  projectDetail?: Record<string, any>;
  additions?: Record<string, any>;
}
