'use client';
import {
  HackathonInfoSectionCustomType,
  HackathonStatusType,
  HackathonType,
  ProjectType
} from '@/service/webApi/resourceStation/type';
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
  hackathon: HackathonType | null;
  isFixedVote: boolean;
  setIsFixedVote: (isFixed: boolean) => void;
  totalLeftVotes: number;
  setTotalLeftVotes: (count: number) => void;
}

export const HackathonVoteContext = createContext<HackathonVoteContextType>({
  voteData: [],
  setVoteData: () => {},
  view: ViewValue.AGENDA,
  setView: () => {},
  initProjects: [],
  setInitProjects: () => {},
  remainingVotes: 0,
  setRemainingVotes: () => {},
  hackathon: null,
  isFixedVote: false,
  setIsFixedVote: () => {},
  totalLeftVotes: 0,
  setTotalLeftVotes: () => {}
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
  JUDGE = 'judge',
  APPLICATION = 'application',
  SUBMISSION = 'submission',
  LINKS = 'links',
  MEDIA_PARTNERS = 'mediaPartners',
  COMMUNITY_PARTNERS = 'communityPartners',
  PARTNERS = 'partners',
  SPEAKERS = 'speakers',
  SPONSORS = 'sponsors',
  SCHEDULE = 'schedule',
  FAQS = 'faqs',
  CUSTOM = 'custom',
  CUSTOM_TEXT = 'customText',
  CUSTOM_IMAGE_NAME = 'customTextImageName',
  CUSTOM_IMAGE_TITLE = 'customTextImageTitle'
}

export enum AddSectionType {
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
  status?: string;
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
  modalEditType: 'add' | 'edit' | '';
  setModalEditType: (type: 'add' | 'edit' | '') => void;
  editCustomInfo: HackathonInfoSectionCustomType | null;
  setEditCustomInfo: (info: HackathonInfoSectionCustomType | null) => void;
  hackathonCustomDelete: VoidFunction;
}

export const HackathonEditContext = createContext<HackathonEditContextType>({
  navs: [],
  modalType: HackathonEditModalType.NULL,
  setModalType: () => {},
  updateHackathon: () => {},
  refreshHackathon: () => {},
  loading: true,
  setLoading: () => {},
  isEdit: false,
  modalEditType: '',
  setModalEditType: () => {},
  editCustomInfo: null,
  setEditCustomInfo: () => {},
  hackathonCustomDelete: () => {}
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
