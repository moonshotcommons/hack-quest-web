import { createContext } from 'react';

export interface MantleContextType {
  mantle: any;
}
export const MantleContext = createContext<MantleContextType>({
  mantle: {}
});
