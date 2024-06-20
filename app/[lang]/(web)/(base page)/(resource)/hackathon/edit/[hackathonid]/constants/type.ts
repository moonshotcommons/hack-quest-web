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
  PARTNERS = 'Partners',
  SPEAKERS_JUDGES = 'speakersAndJudges',
  SPONSORS = 'Sponsors',
  SCHEDULE = 'Schedule',
  FAQS = 'FAQs'
}
export interface HackathonEditContextType {
  navs: HackathonEditNavType[];
  setNavs: (navs: HackathonEditNavType[]) => void;
  modalType: HackathonEditModalType;
  setModalType: (type: HackathonEditModalType) => void;
  updateHackathon: VoidFunction;
}

export const HackathonEditContext = createContext<HackathonEditContextType>({
  navs: [],
  setNavs: () => {},
  modalType: HackathonEditModalType.NULL,
  setModalType: () => {},
  updateHackathon: () => {}
});
