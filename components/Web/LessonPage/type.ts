import { createContext } from 'react';

export interface LessonPageContextType {
  isHandleNext: boolean;
  changeHandleNext: (isHandle: boolean) => void;
  leftLength: number;
  nextLoading: boolean;
}
export const LessonPageContext = createContext<LessonPageContextType>({
  isHandleNext: false,
  changeHandleNext: () => {},
  leftLength: 0,
  nextLoading: false
});
