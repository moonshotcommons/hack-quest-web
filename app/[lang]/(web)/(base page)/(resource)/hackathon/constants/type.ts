import { ProjectType } from '@/service/webApi/resourceStation/type';
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
