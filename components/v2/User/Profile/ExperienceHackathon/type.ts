import { createContext } from 'react';

export enum PageType {
  EXPERIENCE = 'experience',
  HACKATHON = 'hackathon'
}

export interface ExperienceHackathonType {
  refresh: VoidFunction;
}
export const ExperienceHackathon = createContext<ExperienceHackathonType>({
  refresh: () => {}
});
