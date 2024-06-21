import { createContext } from 'react';

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
