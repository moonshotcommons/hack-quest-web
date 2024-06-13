import { createContext } from 'react';

export interface HackathonEditNavType {
  label: string;
  value: string;
}
export interface HackathonEditContextType {
  navs: HackathonEditNavType[];
  setNavs: (navs: HackathonEditNavType[]) => void;
}

export const HackathonEditContext = createContext<HackathonEditContextType>({
  navs: [],
  setNavs: () => {}
});
