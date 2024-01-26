import { createContext } from 'react';

export interface NavbarDataType {
  label: string;
}

export interface LessonPageContextType {
  isHandleNext: boolean;
  changeHandleNext: (isHandle: boolean) => void;
  leftLength: number;
  onBugCommit: VoidFunction;
  nextLoading: boolean;
  navbarData: NavbarDataType[];
  setNavbarData: (data: NavbarDataType[]) => void;
}
export const LessonPageContext = createContext<LessonPageContextType>({
  isHandleNext: false,
  changeHandleNext: () => {},
  leftLength: 0,
  onBugCommit: () => {},
  nextLoading: false,
  navbarData: [],
  setNavbarData: () => {}
});
