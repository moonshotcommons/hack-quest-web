import {
  HackathonDetailContext,
  HackathonEditNavType
} from '@/app/[lang]/(web)/(base page)/(resource)/hackathon/constants/type';
import React, { ReactNode } from 'react';

interface DetailProviderProp {
  children: ReactNode;
  navs: HackathonEditNavType[];
}

const DetailProvider: React.FC<DetailProviderProp> = ({ children, navs }) => {
  return (
    <HackathonDetailContext.Provider
      value={{
        navs
      }}
    >
      {children}
    </HackathonDetailContext.Provider>
  );
};

export default DetailProvider;
