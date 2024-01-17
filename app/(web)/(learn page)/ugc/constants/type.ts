import { createContext } from 'react';

export interface NavbarDataType {
  label: string;
}
export interface UgcContextType {
  navbarData: NavbarDataType[];
  setNavbarData: (data: NavbarDataType[]) => void;
}
export const UgcContext = createContext<UgcContextType>({
  navbarData: [],
  setNavbarData: () => {}
});
