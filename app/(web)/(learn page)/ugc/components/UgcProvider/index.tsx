'use client';
import { FC, ReactNode } from 'react';
import { UgcContext } from '../../constants/type';

interface UgcProviderProps {
  children: ReactNode;
}

const UgcProvider: FC<UgcProviderProps> = ({ children }) => {
  return <UgcContext.Provider value={{}}>{children}</UgcContext.Provider>;
};

export default UgcProvider;
