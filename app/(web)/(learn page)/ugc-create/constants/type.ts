import { createContext } from 'react';

export enum CreateType {
  INTRODUCTION = 'introduction',
  INTENDEDLEARNERS = 'intended learners'
}
export interface UgcCreateContextType {
  loading: boolean;
  setLoaing: (loading: boolean) => void;
}
export const UgcCreateContext = createContext<UgcCreateContextType>({
  loading: false,
  setLoaing: () => {}
});
