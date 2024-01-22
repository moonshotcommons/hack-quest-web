'use client';
import { FC, ReactNode, useEffect, useState } from 'react';
import {
  UgcContext,
  NavbarDataType,
  FooterButtonText,
  footerBtnType,
  FooterButtonStatus
} from '../../constants/type';
import { RendererContext } from '@/components/Web/Business/Renderer/context';
import emitter from '@/store/emitter';

interface UgcProviderProps {
  children: ReactNode;
  lesson: any;
}

const UgcProvider: FC<UgcProviderProps> = ({ children, lesson }) => {
  const [navbarData, setNavbarData] = useState<NavbarDataType[]>([]);
  const [expandData, setExpandData] = useState<Record<string, number[]>>({});
  const [footerBtn, setFooterBtn] = useState<footerBtnType>({
    footerBtnStatus: FooterButtonStatus.NEXT,
    footerBtnText: FooterButtonText.NEXT,
    footerBtnDisable: false,
    footerBtnLoading: false
  });

  useEffect(() => {
    return () => {
      emitter.all.clear();
    };
  }, []);

  return (
    <UgcContext.Provider
      value={{
        navbarData,
        setNavbarData: (data: NavbarDataType[]) => setNavbarData(data),
        lesson,

        footerBtn,
        setFooterBtn: (btn: Partial<footerBtnType>) =>
          setFooterBtn({
            ...footerBtn,
            ...btn
          }),
        expandData,
        updateExpandData: (data: Record<string, number[]>) => {
          setExpandData((state) => ({ ...state, ...data }));
        }
      }}
    >
      <RendererContext.Provider
        value={{
          textRenderer: {
            textStyle: 'body-l text-neutral-black',
            codeStyle:
              'code-l text-code-red bg-neutral-off-white py-[2px] px-[7px]'
          }
        }}
      >
        {children}
      </RendererContext.Provider>
    </UgcContext.Provider>
  );
};

export default UgcProvider;
