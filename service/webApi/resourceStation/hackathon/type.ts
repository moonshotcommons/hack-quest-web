export enum HackathonStatusType {
  ON_GOING = 'onGoing',
  PAST = 'past',
  ALL_PROJECT = '/resource-station/hackathon/projects'
}

export interface MentorType {
  name: string;
  description: string;
  avatar: string;
}

// HackathonType
export interface hType {
  id: string;
  name: string;
  image: string;
  about: string;
  theme: string;
  participants: string[];
  host: string;
  startDate: string;
  endDate: string;
  address: string;
  applyLink: string;
  GuestsAndMentors: MentorType[];
  mediaPartners: MentorType[];
  CommunityPartners: MentorType[];
}
export type HackathonType = Partial<hType>;

export interface HackathonDataType {
  data: HackathonType[];
  total: number;
}
