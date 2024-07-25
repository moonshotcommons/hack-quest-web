import { HackathonEditModalType } from '@/app/[lang]/(web)/(base page)/(resource)/hackathon/constants/type';
import { CustomComponent } from '@/components/ComponentRenderer/type';
import {
  ApplicationSectionType,
  CustomComponentConfig,
  PresetComponentConfig,
  SubmissionSectionType
} from '@/components/HackathonCreation/type';

export enum HackathonStatusType {
  ON_GOING = 'ongoing',
  REVIEW = 'review',
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
  rule: any;
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
  id: string;
  userId: string;
  avatar: string;
  firstName: string;
  lastName: string;
  team: Record<string, any>;
  createdAt: string;
  info: {
    [ApplicationSectionType.About]?: HackathonInfoAboutType;
    [ApplicationSectionType.Contact]?: HackathonInfoContactType;
    [ApplicationSectionType.OnlineProfiles]?: HackathonInfoOnlineProfilesType;
  };
  isAdmin: boolean;
}

export enum HackathonTypeVotesRoleType {
  USER = 'USER',
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

export enum HackathonStatus {
  DRAFT = 'draft',
  REVIEW = 'review',
  PUBLISH = 'publish'
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
  title: string;
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

export type HackathonInfoSectionCustom = HackathonEditModalType.CUSTOM_TEXT &
  HackathonEditModalType.CUSTOM_IMAGE_NAME &
  HackathonEditModalType.CUSTOM_IMAGE_TITLE;

export interface HackathonInfoSectionCustomType {
  id: string;
  type: HackathonInfoSectionCustom;
  title: string;
  text: any;
  list: MentorType[];
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
  customs: HackathonInfoSectionCustomType[];
}

export interface HackathonInfoType {
  address: string;
  application: HackathonApplicationType;
  submission: HackathonSubmissionType;
  sections: HackathonInfoSectionsType;
  conduct: string;
  description: any;
  // description: string | CustomComponent[] | { type: string; content: object };
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
  criteria: any;
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
  creatorId: string;
  name: string;
  info: HackathonInfoType;
  judge: HackathonJudgeType[];
  links: HackathonLinkType;
  memberCount: number;
  enable: boolean;
  progress: string[];
  allowSubmission: boolean;
  alias: string;
  status: HackathonStatus;
  members: HackathonMemberType[];
  sectionSequences: string[];
  participation?: HackathonRegisterInfo;
  rewards: HackathonRewardType[];
  timeline: HackathonTimeLineType;
  votes: HackathonTypeVotesType;
  totalPrize: number;
  projectCount: number;
  remainingVote: number;
  totalLeftVotes?: number;
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
  members: HackathonMemberType[];
  vote: number;
  isSubmit: boolean;
  submitType: string;
  teamId: string;
  winner: false;
  projectLeftVote: number;
  judgesVoteStats: {
    userId: string;
    isMe: boolean;
    vote: number;
  }[];
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
  info: Record<ApplicationSectionType, any>;
  joinState: ApplicationStatus;
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
    allowSubmission: boolean;
    image: string;
    description: any;
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

export interface HackathonVariousType {
  pageView: number;
  todayPageView: number;
  application: number;
  todayApplication: number;
  confirmation: number;
  todayConfirmation: number;
  submission: number;
  todaySubmission: number;
}
export enum ApplicationStatus {
  REVIEW = 'pending',
  APPROVED = 'approved',
  DECLINE = 'decline',
  WAIT = 'waiting'
}

export type HackathonMemberInfoType = {
  [ApplicationSectionType.About]?: HackathonInfoAboutType;
  [ApplicationSectionType.Contact]?: HackathonInfoContactType;
  [ApplicationSectionType.OnlineProfiles]?: HackathonInfoOnlineProfilesType;
};
export interface HackathonManageApplicationMemberType {
  createdAt: string;
  id: string;
  info: HackathonMemberInfoType;
  bio: string;
  name: string;
  pId: string;
  isAdmin: boolean;
  index: number;
  isRegister: boolean;
  isSubmited: boolean;
  joinState: ApplicationStatus;
  avatar: string;
  location: string;
  university: string;
}
export interface HackathonManageApplicationType {
  createdAt: string;
  id: string;
  bio: string;
  name: string;
  index: number;
  type?: 'team' | 'member';
  info?: HackathonMemberInfoType;
  members?: HackathonManageApplicationMemberType[];
  joinState: ApplicationStatus;
  isRegister: boolean;
  isSubmited: boolean;
  pId: string;
  avatar: string;
  location: string;
  university: string;
}

export interface HackathonVoteJudgeType {
  remainingVotes: number;
  isJudge: boolean;
  projects: ProjectType[];
  judge: {
    id: string;
    hackathonId: string;
    judgeAccounts: string[];
    judgeMode: 'judges' | 'all';
    judgeProjectVote: number;
    judgeTotalVote: number;
    projectJudgeCount: number;
    rewardName: string;
    voteMode: 'fixed' | 'score';
  };
  voteRole: HackathonTypeVotesRoleType;
  roleVoted: Record<HackathonTypeVotesRoleType, number>;
  totalVotes: number;
}

export type ProjectVotesType = Omit<HackathonVoteJudgeType, 'projects'>;
