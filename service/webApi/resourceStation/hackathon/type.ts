export enum HackathonType {
  ON_GOING = 'onGoing',
  PAST = 'past',
  ALL_PROJECT = '/resource-station/hackathon/projects'
}

export interface HackathonDetailType {
  about: string;
  address: string;
  applyLink: string;
  communityPartners: { name: string; picture: string }[];
  createdAt: string;
  endTime: string;
  guestsAndMentors: { name: string; title: string; picture: string }[];
  hosts: { name: string; picture: string }[];
  id: string;
  image: string;
  mediaPartners: { name: string; picture: string }[];
  name: string;
  participants: string[];
  startTime: string;
  theme: string;
  updateAt: string;
}
