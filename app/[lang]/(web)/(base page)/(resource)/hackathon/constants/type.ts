import { createContext } from 'react';

export interface OffsetTopsType {
  title: string;
  offsetTop: number;
}

export interface HackathonVoteContextType {
  voteData: any;
  setVoteData: (data: any) => void;
}

export const HackathonVoteContext = createContext<HackathonVoteContextType>({
  voteData: 0,
  setVoteData: () => {}
});
