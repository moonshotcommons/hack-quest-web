import { createContext } from 'react';
export interface NavbarDataType {
  label: string;
}

export interface LessonPageContextType {
  navbarData: NavbarDataType[];
  setNavbarData: (data: NavbarDataType[]) => void;
  isHandleNext: boolean;
  changeHandleNext: (isHandle: boolean) => void;
  leftLength: number;
  nextLoading: boolean;
}
export const LessonPageContext = createContext<LessonPageContextType>({
  navbarData: [],
  setNavbarData: () => {},
  isHandleNext: false,
  changeHandleNext: () => {},
  leftLength: 0,
  nextLoading: false
});
