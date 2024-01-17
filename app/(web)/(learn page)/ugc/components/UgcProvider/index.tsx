'use client';
import { FC, ReactNode, useState } from 'react';
import { UgcContext, NavbarDataType } from '../../constants/type';

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
      {children}
    </UgcContext.Provider>
  );
};

export default UgcProvider;
