'use client';
import { FC, ReactNode, useEffect, useState } from 'react';
import {
  UgcContext,
  NavbarDataType,
  FooterButtonText
} from '../../constants/type';
import { RendererContext } from '@/components/Web/Business/Renderer/context';
import mitt from 'mitt';

interface UgcProviderProps {
  children: ReactNode;
  lesson: any;
}

const UgcProvider: FC<UgcProviderProps> = ({ children, lesson }) => {
  const [navbarData, setNavbarData] = useState<NavbarDataType[]>([]);
  const [footerBtnText, setFooterBtnText] = useState(FooterButtonText.SUBMIT);
  const [footerBtnDisable, setFooterBtnDisable] = useState(true);
  const [footerBtnLoading, setFooterBtnLoading] = useState(false);
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
        footerBtnText,
        setFooterBtnDisable: (disable) => setFooterBtnDisable(disable),
        footerBtnDisable,
        setFooterBtnText: (text) => setFooterBtnText(text),
        emitter,
        footerBtnLoading,
        setFooterBtnLoading: (loading) => setFooterBtnLoading(loading)
      }}
    >
      <RendererContext.Provider
        value={{
          textRenderer: { fontSize: '16px' }
        }}
      >
        {children}
      </RendererContext.Provider>
    </UgcContext.Provider>
  );
};

export default UgcProvider;
