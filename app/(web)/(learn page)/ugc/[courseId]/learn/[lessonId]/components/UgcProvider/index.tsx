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
import mitt from 'mitt';

interface UgcProviderProps {
  children: ReactNode;
  lesson: any;
}

const UgcProvider: FC<UgcProviderProps> = ({ children, lesson }) => {
  const [navbarData, setNavbarData] = useState<NavbarDataType[]>([]);
  const [footerBtn, setFooterBtn] = useState<footerBtnType>({
    footerStatus: FooterButtonStatus.SUBMIT,
    footerBtnText: FooterButtonText.SUBMIT,
    footerBtnDisable: true,
    footerBtnLoading: false
  });
  const emitter = mitt();

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
        emitter,
        footerBtn,
        setFooterBtn: (btn: footerBtnType) => setFooterBtn(btn)
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
