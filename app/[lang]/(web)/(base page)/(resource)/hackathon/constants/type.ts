import { HackathonStatusType, ProjectType } from '@/service/webApi/resourceStation/type';
import { createContext } from 'react';

export interface OffsetTopsType {
  title: string;
  offsetTop: number;
}

export enum ViewValue {
  AGENDA = 'agenda',
  GRID = 'grid',
  CALENDAR = 'calendar'
}

export interface VoteDataType {
  vote: number;
  projectId: string;
}

export interface HackathonVoteContextType {
  voteData: VoteDataType[];
  setVoteData: (data: VoteDataType[]) => void;
  view: ViewValue;
  setView: (view: ViewValue) => void;
  initProjects: ProjectType[];
  setInitProjects: (list: ProjectType[]) => void;
  remainingVotes: number;
  setRemainingVotes: (count: number) => void;
}

export const HackathonVoteContext = createContext<HackathonVoteContextType>({
  voteData: [],
  setVoteData: () => {},
  view: ViewValue.AGENDA,
  setView: () => {},
  initProjects: [],
  setInitProjects: () => {},
  remainingVotes: 0,
  setRemainingVotes: () => {}
});

export interface ProjectDetailContextType {
  titleTxtData: string[];
  // setTitleTxtData: (data: string[]) => void;
}

export const ProjectDetailContext = createContext<ProjectDetailContextType>({
  titleTxtData: []
  // setTitleTxtData: () => {}
});

export interface HackathonEditNavType {
  label: string;
  value: string;
}

export enum HackathonEditModalType {
  NULL = '',
  LIST = 'list',
  COVER = 'cover',
  INFO = 'info',
  TIMELINE = 'timeline',
  REWARDS = 'rewards',
  JUDGING = 'judging',
  APPLICATION = 'application',
  SUBMISSION = 'submission',
  LINKS = 'links',
  MEDIA_PARTNERS = 'mediaPartners',
  COMMUNITY_PARTNERS = 'communityPartners',
  PARTNERS = 'partners',
  SPEAKERS = 'speakers',
  SPONSORS = 'sponsors',
  SCHEDULE = 'schedule',
  FAQS = 'faqs'
}

export interface UpdateHackathonParamType {
  data: Record<string, any>;
  closeModal?: boolean;
  cb?: VoidFunction;
}
export interface HackathonEditContextType {
  navs: HackathonEditNavType[];
  modalType: HackathonEditModalType;
  setModalType: (type: HackathonEditModalType) => void;
  updateHackathon: (param: UpdateHackathonParamType) => void;
  refreshHackathon: VoidFunction;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  isEdit: boolean;
}

export const HackathonEditContext = createContext<HackathonEditContextType>({
  navs: [],
  modalType: HackathonEditModalType.NULL,
  setModalType: () => {},
  updateHackathon: () => {},
  refreshHackathon: () => {},
  loading: true,
  setLoading: () => {},
  isEdit: false
});

export interface HackathonDetailContextType {
  navs: HackathonEditNavType[];
}

export const HackathonDetailContext = createContext<HackathonDetailContextType>({
  navs: []
});

export interface HackathonTabType {
  label: string;
  value: HackathonStatusType;
  count?: number;
}
