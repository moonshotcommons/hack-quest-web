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

export interface HackathonVoteContextType {
  voteData: any;
  setVoteData: (data: any) => void;
  view: ViewValue;
  setView: (view: ViewValue) => void;
}

export const HackathonVoteContext = createContext<HackathonVoteContextType>({
  voteData: 0,
  setVoteData: () => {},
  view: ViewValue.AGENDA,
  setView: () => {}
});
