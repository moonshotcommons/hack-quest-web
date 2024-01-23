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
  footerBtnStatus: FooterButtonStatus;
  footerBtnDisable: boolean;
  footerBtnText: FooterButtonText;
  footerBtnLoading: boolean;
}
export interface UgcContextType {
  navbarData: NavbarDataType[];
  setNavbarData: (data: NavbarDataType[]) => void;
  lesson: any;

  footerBtn: footerBtnType;
  setFooterBtn: (btn: Partial<footerBtnType>) => void;
  expandData: Record<string, number[]>;
  updateExpandData: (data: Record<string, number[]>) => void;
}
export const UgcContext = createContext<UgcContextType>({
  navbarData: [],
  setNavbarData: () => {},
  lesson: {},

  footerBtn: {
    footerBtnStatus: FooterButtonStatus.SUBMIT,
    footerBtnDisable: false,
    footerBtnText: FooterButtonText.SUBMIT,
    footerBtnLoading: false
  },
  expandData: {},
  updateExpandData: (data: Record<string, number[]>) => {},
  setFooterBtn: () => {}
});
