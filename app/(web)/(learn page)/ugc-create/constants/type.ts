import { createContext } from 'react';

export enum CreateType {
  INTRODUCTION = 'introduction',
  INTENDEDLEARNERS = 'intended learners'
}
export interface UgcCreateContextType {}
export const UgcCreateContext = createContext<UgcCreateContextType>({});
