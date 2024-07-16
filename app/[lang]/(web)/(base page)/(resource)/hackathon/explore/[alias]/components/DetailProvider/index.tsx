import React, { ReactNode } from 'react';
import { HackathonDetailContext, HackathonEditNavType } from '../../../../constants/type';

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
