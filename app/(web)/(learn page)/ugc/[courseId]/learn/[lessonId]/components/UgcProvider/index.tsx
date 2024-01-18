'use client';
import { FC, ReactNode, useState } from 'react';
import { UgcContext, NavbarDataType } from '../../constants/type';
import { RendererContext } from '@/components/Web/Business/Renderer/context';

interface UgcProviderProps {
  children: ReactNode;
}

const UgcProvider: FC<UgcProviderProps> = ({ children }) => {
  const [navbarData, setNavbarData] = useState<NavbarDataType[]>([]);
  return (
    <UgcContext.Provider
      value={{
        navbarData,
        setNavbarData: (data: NavbarDataType[]) => setNavbarData(data)
      }}
    >
      <RendererContext.Provider value={{}}>{children}</RendererContext.Provider>
    </UgcContext.Provider>
  );
};

export default UgcProvider;
