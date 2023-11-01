export enum HackathonStatusType {
  ON_GOING = 'ongoing',
  PAST = 'past',
  ALL_PROJECT = '/resource-station/hackathon/projects'
}

export interface MentorType {
  name: string;
  title: string;
  picture: string;
}
export interface HackathonType {
  id: string;
  name: string;
  image: string;
  about: string;
  theme: string;
  participants: string[];
  hosts: Omit<MentorType, 'title'>[];
  startTime: string;
  endTime: string;
  address: string;
  applyLink: string;
  guestsAndMentors: MentorType[];
  mediaPartners: MentorType[];
  communityPartners: MentorType[];
  status: HackathonStatusType;
}

export interface HackathonDataType {
  data: HackathonType[];
  total: number;
}

export const acquiescePageInfo = {
  page: 1,
  limit: 1000
};
