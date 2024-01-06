import { CustomComponent } from '@/components/Web/Business/Renderer/type';

export enum HackathonStatusType {
  ON_GOING = 'ongoing',
  PAST = 'past',
  ALL_PROJECT = '/hackathon/projects'
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

export type ProjectType = {
  id: string;
  name: string;
  description: string;
  video: string;
  introduction: string;
  team: string;
  hackathonId: string;
  hackathonName: string;
  tracks: string[];
  featured: boolean;
  apolloDay: boolean;
  thumbnail: string;
};

export interface ProjectDataType {
  data: ProjectType[];
  total: number;
}

export interface BlogSearchType {
  keyword: string;
  category: string;
  sort: string;
  page: number;
  limit: number;
}

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
}

export type BlogContentType = {
  content: CustomComponent[];
};

export type BlogDetailType = BlogType & BlogContentType;
