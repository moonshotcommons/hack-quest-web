import { createContext } from 'react';

export interface NavbarDataType {
  label: string;
}

export enum FooterButtonText {
  SUBMIT = 'SUBMIT',
  NEXT = 'NEXT'
}
// export type MittEvents = {
//   submit: string;
//   bar?: number;
// };
export interface UgcContextType {
  navbarData: NavbarDataType[];
  setNavbarData: (data: NavbarDataType[]) => void;
  lesson: any;
  footerBtnDisable: boolean;
  setFooterBtnDisable: (disable: boolean) => void;
  footerBtnText: FooterButtonText;
  setFooterBtnText: (text: FooterButtonText) => void;
  emitter: any;
  footerBtnLoading: boolean;
  setFooterBtnLoading: (loading: boolean) => void;
}
export const UgcContext = createContext<UgcContextType>({
  navbarData: [],
  setNavbarData: () => {},
  lesson: {},
  footerBtnDisable: false,
  setFooterBtnDisable: () => {},
  footerBtnText: FooterButtonText.SUBMIT,
  setFooterBtnText: () => {},
  emitter: null,
  footerBtnLoading: false,
  setFooterBtnLoading: () => {}
});
