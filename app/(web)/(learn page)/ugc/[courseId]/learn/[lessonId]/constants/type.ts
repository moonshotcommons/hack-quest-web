import { createContext } from 'react';

export interface NavbarDataType {
  label: string;
}

export enum FooterButtonText {
  SUBMIT = 'SUBMIT',
  NEXT = 'NEXT'
}
export enum FooterButtonStatus {
  SUBMIT = 'submit',
  NEXT = 'next'
}
export interface footerBtnType {
  footerStatus: FooterButtonStatus;
  footerBtnDisable: boolean;
  footerBtnText: FooterButtonText;
  footerBtnLoading: boolean;
}
export interface UgcContextType {
  navbarData: NavbarDataType[];
  setNavbarData: (data: NavbarDataType[]) => void;
  lesson: any;
  emitter: any;
  footerBtn: footerBtnType;
  setFooterBtn: (btn: footerBtnType) => void;
}
export const UgcContext = createContext<UgcContextType>({
  navbarData: [],
  setNavbarData: () => {},
  lesson: {},
  emitter: null,
  footerBtn: {
    footerStatus: FooterButtonStatus.SUBMIT,
    footerBtnDisable: false,
    footerBtnText: FooterButtonText.SUBMIT,
    footerBtnLoading: false
  },
  setFooterBtn: () => {}
});
